// "use client";

// import { useUser } from "@clerk/nextjs";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function AuthSync() {
//   const { user, isSignedIn } = useUser();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     if (!isSignedIn || !user) return;

//     const synced =
//       typeof window !== "undefined" &&
//       localStorage.getItem("authSynced") === "true";

//     // ✅ Skip if synced AND not on /
//     if (synced && pathname !== "/") return;

//     const role = user.unsafeMetadata?.role;

//     // ✅ If role exists and we're on /, redirect based on role
//     if (pathname === "/" && role) {
//       localStorage.setItem("authSynced", "true");

//       if (role === "ADMIN") return router.replace("/admin");
//       if (role === "SELLER") return router.replace("/seller");
//       if (role === "BUYER") return router.replace("/buyer");
//     }

//     // 🔁 If role is missing, sync it from backend
//     if (!role) {
//       const sync = async () => {
//         const userId = user.id;
//         const email = user.primaryEmailAddress?.emailAddress;

//         try {
//           const res = await fetch(`http://localhost:3004/users/${userId}`);

//           if (res.status === 404) {
//             await fetch("http://localhost:3004/users", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 id: userId,
//                 email,
//                 role: "BUYER",
//               }),
//             });

//             await user.update({
//               unsafeMetadata: { role: "BUYER" },
//             });

//             localStorage.setItem("authSynced", "true");
//             router.replace("/buyer");
//           } else if (res.ok) {
//             const existingUser = await res.json();
//             const role = existingUser.role;

//             await user.update({
//               unsafeMetadata: { role },
//             });

//             localStorage.setItem("authSynced", "true");

//             if (role === "ADMIN") router.replace("/admin");
//             else if (role === "SELLER") router.replace("/seller");
//             else router.replace("/buyer");
//           }
//         } catch (err) {
//           console.error("❌ Sync error:", err);
//         }
//       };

//       sync();
//     }
//   }, [isSignedIn, user, pathname, router]);

//   return null;
// }

"use client";

import { createOrFindUser, getUserById } from "@/lib/services/users";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthSync() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const synced =
      typeof window !== "undefined" &&
      localStorage.getItem("authSynced") === "true";

    // ✅ Skip if synced AND not on `/`
    if (synced && pathname !== "/") return;

    const role = user.unsafeMetadata?.role;

    // ✅ If role exists and we're on `/`, redirect based on role
    if (pathname === "/" && role) {
      localStorage.setItem("authSynced", "true");

      if (role === "ADMIN") return router.replace("/admin");
      if (role === "SELLER") return router.replace("/seller");
      if (role === "BUYER") return router.replace("/buyer");
    }

    // 🔁 If role is missing, sync it from backend
    if (!role) {
      const sync = async () => {
        const userId = user.id;
        const email = user.primaryEmailAddress?.emailAddress ?? "";

        try {
          const res = await getUserById(userId);

          if (res.status === 404) {
            await createOrFindUser({
              id: userId,
              email,
              role: "BUYER",
            });

            await user.update({
              unsafeMetadata: { role: "BUYER" },
            });

            localStorage.setItem("authSynced", "true");
            router.replace("/buyer");
          } else if (res.ok) {
            const existingUser = await res.json();
            const role = existingUser.role;

            await user.update({
              unsafeMetadata: { role },
            });

            localStorage.setItem("authSynced", "true");

            if (role === "ADMIN") router.replace("/admin");
            else if (role === "SELLER") router.replace("/seller");
            else router.replace("/buyer");
          }
        } catch (err) {
          console.error("❌ Sync error:", err);
        }
      };

      sync();
    }
  }, [isSignedIn, user, pathname, router]);

  return null;
}
