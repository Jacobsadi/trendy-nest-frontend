"use client";

import { Input } from "@/components/ui/input";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import {
  Bell,
  Clock,
  Moon,
  Search,
  Settings,
  ShoppingCart,
} from "lucide-react";

interface HeaderProps {
  toggleCart: () => void;
  cartItemsCount: number;
}

export default function Header({
  toggleCart,
  cartItemsCount = 0,
}: HeaderProps) {
  return (
    <header className="top-0 left-0 w-full flex justify-between fixed items-center p-4 border-b bg-gray-800 border-gray-700 z-50">
      <h1 className="text-lg font-semibold text-white">CREATE PRODUCT</h1>

      <div className="flex items-center gap-4">
        <Moon className="w-5 h-5 text-gray-400" />

        <div className="relative">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        <div className="relative cursor-pointer" onClick={toggleCart}>
          <ShoppingCart className="w-5 h-5 text-gray-400" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </div>

        <Settings className="w-5 h-5 text-gray-400" />
        <Clock className="w-5 h-5 text-gray-400" />

        {/* Auth UI */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="text-sm text-green-400 hover:text-green-300 transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
            {/* ✅ Fully controlled sign-out with redirect */}
          </SignedIn>
        </div>

        <div className="relative ml-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 bg-gray-800 border-gray-700 text-sm rounded-full w-40 h-8"
            placeholder="Search..."
          />
        </div>
      </div>
    </header>
  );
}
