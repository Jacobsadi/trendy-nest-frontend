import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ShoppingBag, Users } from "lucide-react";
import Link from "next/link";

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-gray-800 border-b border-gray-700 shadow-md">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between h-16">
        <h1 className="text-xl font-semibold text-white">
          <Link href="/">Admin Dashboard</Link>
        </h1>

        <nav className="flex space-x-1 mt-2 sm:mt-0">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={() => document.getElementById("users-tab")?.click()}
          >
            <Users className="h-4 w-4 mr-2" />
            Users
          </Button>
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={() => document.getElementById("products-tab")?.click()}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Products
          </Button>
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
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
