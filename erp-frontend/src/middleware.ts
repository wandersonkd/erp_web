// The middleware will be placed at the root of src/
// It will protect specified routes from unauthenticated access.

export { default } from 'next-auth/middleware';

// The matcher configures which routes are protected.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (the login page itself)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};