// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// import { NextResponse } from "next/server";

// const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// const isSellerRoute = createRouteMatcher(["/seller(.*)"]);

// const isBuyerRoute = createRouteMatcher(["/buyer(.*)"]);

// type SessionClaimsWithRole = {
//   unsafe_metadata?: {
//     role?: "ADMIN" | "SELLER" | "BUYER";
//   };
// };

// export default clerkMiddleware(async (auth, req) => {
//   const authResult = await auth(); // 👮 Redirect unauthenticated users
//   const userId = authResult.userId;
//   console.log(
//     "==========================================================================================>",
//     userId
//   );
//   const res = await fetch(`http://localhost:3004/users/${userId}`);
//   const data = await res.json();
//   console.log(
//     "==========================================================================================>",
//     data
//   );
//   const isProtectedRoute =
//     isAdminRoute(req) || isSellerRoute(req) || isBuyerRoute(req);

//   if (isProtectedRoute && !authResult.userId) {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   const session = authResult.sessionClaims as SessionClaimsWithRole;

//   const role = session?.unsafe_metadata?.role;

//   console.log("PUBLIC DATA==================>", role);

//   if (isAdminRoute(req) && role !== "ADMIN") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   if (isSellerRoute(req) && role !== "SELLER") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   if (isBuyerRoute(req) && role !== "BUYER") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     // Only match routes you care about

//     "/((?!_next|[^?]*\\.(?:.*)).*)",

//     "/(api|trpc)(.*)",
//   ],
// };

export const runtime = "nodejs";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isSellerRoute = createRouteMatcher(["/seller(.*)"]);
const isBuyerRoute = createRouteMatcher(["/buyer(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const authResult = await auth();
  const userId = authResult.userId;

  const isProtectedRoute =
    isAdminRoute(req) || isSellerRoute(req) || isBuyerRoute(req);

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (!userId) return NextResponse.next();

  console.log(
    "==========================================================================================>"
  );
  console.log("USER ID ===================>", userId);

  let role: "ADMIN" | "SELLER" | "BUYER" | undefined;

  try {
    const res = await fetch(`http://localhost:3004/users/${userId}`);
    console.log("RESPONSE STATUS ==========>", res.status);

    if (res.status === 404) {
      console.warn("⏳ User not in backend yet — skipping check");
      return NextResponse.next();
    }

    if (res.ok) {
      const userData = await res.json();
      role = userData.role;
      console.log("✅ BACKEND ROLE ==========>", role);
    } else {
      console.warn("❌ Unexpected backend error:", await res.text());
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ✅ Redirect "/" to dashboard
  if (req.nextUrl.pathname === "/") {
    if (role === "ADMIN")
      return NextResponse.redirect(new URL("/admin", req.url));
    if (role === "SELLER")
      return NextResponse.redirect(new URL("/seller", req.url));
    if (role === "BUYER")
      return NextResponse.redirect(new URL("/buyer", req.url));
  }

  // ✅ Role route protection
  if (isAdminRoute(req) && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (isSellerRoute(req) && role !== "SELLER") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (isBuyerRoute(req) && role !== "BUYER") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:.*)).*)", "/(api|trpc)(.*)"],
};
