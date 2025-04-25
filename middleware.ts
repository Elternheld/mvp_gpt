import { authMiddleware } from "@clerk/nextjs";

// Example middleware configuration
export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};