import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const SCOPES = [
  'openid',
  'email',
  'profile',
  'offline_access',
  'https://graph.microsoft.com/Mail.Read',
  'https://graph.microsoft.com/Mail.Send',
  'https://graph.microsoft.com/Mail.ReadWrite',
  'https://graph.microsoft.com/Calendars.ReadWrite',
].join(' ');

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const clientId = process.env.MICROSOFT_CLIENT_ID!;
  const tenant = process.env.MICROSOFT_TENANT_ID || 'common';

  // Always use the current request's origin so the callback goes back to
  // whichever domain the user is on (Orchids, Vercel, production, etc.)
  const redirectUri = `${req.nextUrl.origin}/api/integrations/outlook/callback`;

  const returnTo = req.nextUrl.searchParams.get('returnTo') || '/dashboard/integrations';

  // Encode userId, redirectUri, and return target so the callback knows where it came from
  const state = Buffer.from(
    JSON.stringify({ userId: session.user.id, redirectUri, returnTo })
  ).toString('base64url');

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: SCOPES,
    state,
    response_mode: 'query',
    prompt: 'select_account',
  });

  const authUrl = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize?${params}`;
  return NextResponse.redirect(authUrl);
}
