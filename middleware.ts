import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

/* export default authMiddleware({
  publicRoutes: [
    "/",
    "/events/:id",
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
  ],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
  ],
}); */

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers.get("host")!;

  const path = url.pathname;

  let subdomain = hostname.split(".")[0];

  subdomain = subdomain.replace("localhost:3000", "");

  // handle no subdomain or www with base path
  if (subdomain === "www" || subdomain === "") {
    return NextResponse.next();
  }

  // subdomains
  if (subdomain !== "app") {
    return NextResponse.rewrite(
      new URL(`/users/${subdomain}${path === "/" ? "" : path}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
