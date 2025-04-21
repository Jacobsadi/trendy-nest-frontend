"use client";

import { Input } from "@/components/ui/input";
import { Bell, Clock, Moon, Search, Settings } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="top-0 left-0 w-full flex justify-between fixed items-center p-4 border-b bg-gray-800 border-gray-700 z-50">
      <h1 className="text-lg font-semibold">CREATE PRODUCT</h1>
      <div className="flex items-center gap-4">
        <Moon className="w-5 h-5 text-gray-400" />
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>
        <Settings className="w-5 h-5 text-gray-400" />
        <Clock className="w-5 h-5 text-gray-400" />
        <div className="w-8 h-8 rounded-full bg-orange-300 flex items-center justify-center overflow-hidden">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="User avatar"
            width={32}
            height={32}
            className="object-cover"
          />
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
