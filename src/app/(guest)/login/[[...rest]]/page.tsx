"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center">
      <SignIn path="/login" routing="path" />
    </div>
  );
}
