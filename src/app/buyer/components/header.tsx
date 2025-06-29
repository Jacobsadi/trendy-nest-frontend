"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { History, Home, Settings, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
      <Link href="/main">
        <div className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/trendynest-logo.png"
            alt="TrendyNest Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-lg font-semibold text-white">Trendy-Nest</h1>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {/* Show these only if user is signed in */}
        <SignedIn>
          <div className="relative cursor-pointer" onClick={toggleCart}>
            <ShoppingCart className="w-5 h-5 text-gray-400" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </div>

          <Link href="/buyer/profile">
            <button className="p-1 rounded hover:bg-gray-700 transition">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </Link>
          <Link href="/buyer">
            <button className="p-1 rounded hover:bg-gray-700 transition">
              <Home className="w-5 h-5 text-gray-400" />
            </button>
          </Link>
          <Link href="/buyer/history">
            <button className="p-1 rounded hover:bg-gray-700 transition">
              <History className="w-5 h-5 text-gray-400" />
            </button>
          </Link>

          {/* User avatar and sign-out */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
        </SignedIn>

        {/* Show these only if user is signed out */}
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
        <div className="relative ml-4"></div>
      </div>
    </header>
  );
}
