// "use client";

// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function AuthSync() {
//   const { user, isSignedIn } = useUser();
//   const router = useRouter();

//   useEffect(() => {    if (!isSignedIn || !user) return;     const selectedRole = localStorage.getItem("selectedRole");

//     if (!selectedRole) {
//       console.warn("No role selected before signup");
//       return;
//     }

//     const sync = async () => {
//       await fetch("/api/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id: user.id,
//           email: user.primaryEmailAddress?.emailAddress || "",
//           name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
//           role: selectedRole,
//         }),
//       });

//       localStorage.removeItem("selectedRole"); // Clean up

//       if (selectedRole === "buyer") {
//         router.push("/buyer");
//       } else if (selectedRole === "seller") {
//         router.push("/seller");
//       }
//     };

//     sync();
//   }, [isSignedIn, user, router]);

//   return null;
// }

// "use client";

// import { useSession, useUser } from "@clerk/nextjs"; // Import useSession
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function AuthSync() {
//   const { user, isSignedIn } = useUser();
//   const { session } = useSession(); // Get session object
//   const router = useRouter();

//   useEffect(() => {
//     if (!isSignedIn || !user) {
//       return;
//     }

//     const selectedRole = localStorage.getItem("selectedRole") as
//       | "BUYER"
//       | "SELLER"
//       | "ADMIN"
//       | null; // Ensure you handle ADMIN role if applicable

//     if (!selectedRole) {
//       console.warn(
//         "No selected role found in localStorage. Redirecting to role selection."
//       );
//       // Optionally redirect to role selection or an error page
//       // router.push('/role-selector'); // Example redirect
//       return;
//     }

//     const syncUserAndRedirect = async () => {
//       const userData = {
//         id: user.id,
//         email: user.primaryEmailAddress?.emailAddress,
//         role: selectedRole,
//         // Include addresses if your backend expects it and it's available
//         // addresses: [], // Example: If you collect addresses later or have defaults
//       };

//       console.log("Sending user data to backend:", userData);

//       // 1. Save user to your backend (existing logic)
//       try {
//         const res = await fetch("http://localhost:3004/users", {
//           // Your API endpoint
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(userData),
//         });

//         if (!res.ok) {
//           const errorText = await res.text();
//           console.error(
//             "Backend API responded with an error:",
//             res.status,
//             errorText
//           );
//         } else {
//           console.log("User data successfully synced with backend.");
//         }
//       } catch (err) {
//         console.error("Error calling backend API:", err);
//       }

//       // 2. Update Clerk user metadata and refresh session
//       try {
//         console.log(
//           `Attempting to update Clerk user unsafeMetadata with role: ${selectedRole}`
//         );
//         await user.update({
//           unsafeMetadata: { role: selectedRole },
//         });
//         console.log("Clerk user unsafeMetadata updated successfully.");

//         if (session) {
//           console.log("Attempting to reload Clerk session...");
//           await session.reload();
//           console.log(
//             "Clerk session reloaded successfully. Middleware should now have updated claims."
//           );
//         } else {
//           console.warn(
//             "Clerk session object not available. Session reload skipped. Middleware might not have the latest data immediately."
//           );
//         }
//       } catch (err) {
//         console.error(
//           "Error updating Clerk user unsafeMetadata or reloading session:",
//           err
//         );
//       }

//       // 3. Clean up localStorage
//       localStorage.removeItem("selectedRole");

//       // 4. Redirect user
//       console.log(`Redirecting user with role ${selectedRole}`);
//       if (selectedRole === "ADMIN") {
//         // Make sure your RoleSelector can set "ADMIN"
//         router.push("/admin");
//       } else if (selectedRole === "SELLER") {
//         router.push("/seller");
//       } else {
//         // Default to BUYER or handle other roles
//         router.push("/buyer");
//       }
//     };

//     syncUserAndRedirect();
//   }, [isSignedIn, user, router, session]); // Add session to the dependency array

//   // Render null or a loading indicator while the sync and redirect happen
//   return null; // Or <p>Finalizing your setup...</p>;
// }

// "use client";

// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function AuthSync() {
//   const { user, isSignedIn } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isSignedIn || !user) return;

//     const selectedRole = localStorage.getItem("selectedRole");
//     if (!selectedRole) return;

//     const sync = async () => {
//       const userData = {
//         id: user.id,
//         email: user.primaryEmailAddress?.emailAddress,
//         role: selectedRole,
//       };

//       console.log("Sending user to backend:", userData);

//       try {
//         await fetch("http://localhost:3004/users", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(userData),
//         });
//       } catch (err) {
//         console.error("Error calling backend:", err);
//       }

//       try {
//         const existingRole = user.unsafeMetadata?.role;

//         if (!existingRole) {
//           await user.update({
//             unsafeMetadata: { role: selectedRole },
//           });
//           console.log("Clerk role set for first time:", selectedRole);
//         } else {
//           console.log("Clerk role already exists:", existingRole);
//         }
//       } catch (err) {
//         console.error("Failed to update Clerk metadata:", err);
//       }

//       localStorage.removeItem("selectedRole");

//       if (selectedRole === "ADMIN") {
//         router.push("/admin");
//       } else if (selectedRole === "SELLER") {
//         router.push("/seller");
//       } else {
//         router.push("/buyer");
//       }
//     };

//     sync();
//   }, [isSignedIn, user, router]);

//   return null;
// }

"use client";

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
        const email = user.primaryEmailAddress?.emailAddress;

        try {
          const res = await fetch(`http://localhost:3004/users/${userId}`);

          if (res.status === 404) {
            await fetch("http://localhost:3004/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: userId,
                email,
                role: "BUYER",
              }),
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
