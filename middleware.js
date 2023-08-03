import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/', '/register', '/discover']
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

