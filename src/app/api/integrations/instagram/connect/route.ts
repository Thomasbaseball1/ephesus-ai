import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

// Instagram Business Login scopes (Instagram Login flow — no Facebook Page required)
const SCOPES = [
  'instagram_business_basic',
  'instagram_business_manage_messages',
  'instagram_business_manage_comments',
  'instagram_business_content_publish',
  'instagram_business_manage_insights',
].join(',');

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const clientId = process.env.INSTAGRAM_CLIENT_ID;
  if (!clientId) {
    console.error('[Instagram connect] INSTAGRAM_CLIENT_ID not set');
    const url = new URL('/dashboard/integrations', req.url);
    url.searchParams.set('error', 'instagram_not_configured');
    return NextResponse.redirect(url);
  }

  const baseUrl = process.env.BETTER_AUTH_URL || req.nextUrl.origin;
  const redirectUri = `${baseUrl}/api/integrations/instagram/callback`;

  const state = Buffer.from(
    JSON.stringify({ userId: session.user.id, redirectUri })
  ).toString('base64url');

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: SCOPES,
    response_type: 'code',
    state,
  });

  // Instagram Business Login — works directly with Business/Creator accounts, no Facebook Page needed
  const authUrl = `https://www.instagram.com/oauth/authorize?${params}`;
  return NextResponse.redirect(authUrl);
}
