import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { clerkUserId, email } = await req.json();
  let role = "BUYER";

  // 1. Check with your backend
  const res = await fetch(`http://localhost:3004/users/${clerkUserId}`);

  if (res.status === 404) {
    // Create user in backend
    await fetch("http://localhost:3004/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: clerkUserId, email, role }),
    });
  } else if (res.ok) {
    const existingUser = await res.json();
    role = existingUser.role;
  }

  // 2. Update Clerk metadata (DOES NOT refresh session immediately!)
  await clerkClient.users.updateUser(clerkUserId, {
    unsafeMetadata: { role },
  });

  return NextResponse.json({ role });
}
