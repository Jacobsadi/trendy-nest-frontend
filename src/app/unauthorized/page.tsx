"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, ShieldX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-red-50 dark:bg-red-950/50 p-4 rounded-full">
                <ShieldX className="h-12 w-12 text-red-500" />
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-red-500 tracking-tight">
              403
            </h1>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Access Denied
            </h2>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              You don't have permission to access this resource. Please contact
              your administrator if you believe this is an error.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex-1 gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button
              asChild
              className="flex-1 gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>

          {/* Additional Help */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Need help?{" "}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline underline-offset-4"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-red-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
