import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { createRouteLoader } from 'next/dist/client/route-loader'

// auth() is a function that allows us to say 'redirect that person' and the req object is the request object
export default clerkMiddleware(async (auth, req) => {
    // if it's a protected route, call auth.protect()
    if (isProtectedRoute(req)) {
        await auth.protect()
    }

})

// we'll use this to check if the user is trying to navigate to the /users route
const isProtectedRoute = createRouteMatcher(['/users(.*)'])

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}