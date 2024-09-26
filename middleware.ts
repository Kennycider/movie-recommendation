import { NextResponse } from 'next/server'
import { auth } from './auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const publicRoutes = ['/login', '/signup']
  const protectedRoutes = ['/', '/recommendations', '/movie']

  // Function to check if the current path is a subroute of a protected route
  const isProtectedRoute = (path: string) => {
    return protectedRoutes.some(route => path.startsWith(route))
  }

  // Allow access to public routes
  if (publicRoutes.some(route => nextUrl.pathname === route)) {
    if (isLoggedIn) {
      // Redirect logged-in users away from public routes
      return NextResponse.redirect(new URL('/', nextUrl))
    }
    return NextResponse.next()
  }

  // Protect private routes and their subroutes
  if (isProtectedRoute(nextUrl.pathname) && !isLoggedIn) {
    // Redirect to login page if trying to access protected routes while not logged in
    const loginUrl = new URL('/login', nextUrl)
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
    
    return NextResponse.redirect(loginUrl)
  }

  // Allow access to all other routes
  return NextResponse.next()
})

// Update the matcher to exclude static assets and API routes
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg)$).*)',
  ],
}