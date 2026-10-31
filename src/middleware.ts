import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const NOINDEX_PATTERNS = [
  /^\/api\//,
  /^\/admin\//,
  /^\/dashboard\//,
  /^\/checkout\//,
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  const forwardedProto = request.headers.get('x-forwarded-proto');

  // Enforce HTTPS redirect for non-localhost
  if (!hostname.includes('localhost') && forwardedProto === 'http') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  // Trailing slash normalization (strip trailing slash except root /)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;

  if (NOINDEX_PATTERNS.some(p => p.test(pathname)) || hostname.includes('.vercel.app')) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
