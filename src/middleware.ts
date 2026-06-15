import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const NOINDEX_PATTERNS = [
  /^\/api\//,
  /^\/admin\//,
  /^\/dashboard\//,
  /^\/checkout\//,
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (NOINDEX_PATTERNS.some(p => p.test(pathname))) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*',
    '/dashboard/:path*',
    '/checkout/:path*',
  ]
};
