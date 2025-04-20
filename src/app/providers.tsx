"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "../components/ui/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        {children}
      </ClerkProvider>
    </ThemeProvider>
  );
}
