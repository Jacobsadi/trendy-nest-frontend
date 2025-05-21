"use client";

import Cart from "@/app/buyer/components/cart";
import { useCartStore } from "@/lib/services/cartStore";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { getUserById, updateUser } from "@/lib/services/users";
import { useUser } from "@clerk/nextjs";
import Header from "../products/components/Header";

export default function ProfilePage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { user } = useUser();
  const userId = user?.id;
  console.log("USER DATA ======================>", user?.fullName);
  const email = user?.emailAddresses[0]?.emailAddress || "";
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    gender: "male",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const backendUser = await getUserById(userId);

        setFormData((prev) => ({
          ...prev,
          username: user?.fullName || "",
          email: email || "",
          addressLine1: backendUser.addresses?.line1 || "",
          addressLine2: backendUser.addresses?.line2 || "",
          city: backendUser.addresses?.city || "",
          state: backendUser.addresses?.state || "",
          zipCode: backendUser.addresses?.zipCode || "",
          country: backendUser.addresses?.country || "",
        }));
      } catch (err) {
        console.error("Failed to load user data:", err);
      }
    };

    fetchUserData();
  }, [userId, user?.username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    const addressPayload = {
      addresses: {
        line1: formData.addressLine1,
        line2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
    };

    try {
      await updateUser(userId, addressPayload);
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Failed to update address:", error);
      alert("Something went wrong while saving the address.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-800 text-white">
      <Header />

      <div className="pt-15 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8 shadow">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            <p className="text-gray-400">Manage and protect your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-gray-900 text-white border border-gray-700"
                disabled
              />
              <p className="text-sm text-gray-500">Username is read-only.</p>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">{formData.email}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLine1" className="text-gray-300">
                Address
              </Label>
              <Input
                id="addressLine1"
                name="addressLine1"
                placeholder="Address Line 1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="bg-gray-900 text-white border border-gray-700"
              />
              <Input
                id="addressLine2"
                name="addressLine2"
                placeholder="Address Line 2 (Optional)"
                value={formData.addressLine2}
                onChange={handleChange}
                className="bg-gray-900 text-white border border-gray-700 mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="bg-gray-900 text-white border border-gray-700"
              />
              <Input
                id="state"
                name="state"
                placeholder="State/Province"
                value={formData.state}
                onChange={handleChange}
                className="bg-gray-900 text-white border border-gray-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                id="zipCode"
                name="zipCode"
                placeholder="Zip/Postal Code"
                value={formData.zipCode}
                onChange={handleChange}
                className="bg-gray-900 text-white border border-gray-700"
              />
              <Input
                id="country"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="bg-gray-900 text-white border border-gray-700"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}
