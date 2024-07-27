import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
'/',
  '/api/webhooks(.*)'
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: [
    "/((?!.*\\..*|_next|api/uploadthing).*)", // Exclude /api/uploadthing from being matched
    "/",
    "/(api|trpc)(.*)"
  ],
}