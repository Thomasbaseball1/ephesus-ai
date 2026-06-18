import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = 'tmore.haller@yahoo.com';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken =
    request.cookies.get('better-auth.session_token')?.value ||
    request.cookies.get('__Secure-better-auth.session_token')?.value;

  // Redirect logged-in users away from login/signup
  if ((pathname === '/login' || pathname === '/signup') && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Block unauthenticated access to dashboard
  if (pathname.startsWith('/dashboard') && !sessionToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Block unauthenticated access to admin — email check happens in the layout
  if (pathname.startsWith('/admin') && !sessionToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/admin', '/login', '/signup'],
};
