import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  const { pathname, search, origin } = req.nextUrl

  // Does anything have to be done?
  if (pathname !== pathname.toLowerCase()) {
    return NextResponse.redirect(
      new URL(`${pathname.toLowerCase()}${search}`, origin), // only lowercase path and not query params
      301 // Using a 301 redirect to show lowercase is the canonical url
    )
  }

  return NextResponse.next()
}

// Ensure the middleware doesn't intercept static assets or API routes
export const config = {
  /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
