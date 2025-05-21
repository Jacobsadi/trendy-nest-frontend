"use client";
import { ChatBot } from "@/components/ChatBot";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <p className="text-gray-300 mb-2">
          This is an example profile page to demonstrate the ChatBot component.
        </p>
      </div>

      {/* Add the ChatBot with different position and context */}
      <ChatBot
        position="bottom-left"
        initialMessage="👋 Welcome to your profile page! Need help managing your account?"
        pageContext="user profile"
      />
    </main>
  );
}
