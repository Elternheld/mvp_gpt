import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/generator"],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};