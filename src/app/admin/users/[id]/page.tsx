"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { getAllUsers, mockUsers, updateUser } from "@/lib/services/users";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserFormData {
  username: string;
  email: string;
  role: string;
  status: string;
  address: {
    line1: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
}

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    role: "",
    status: "",
    address: {
      line1: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getAllUsers();
        const fallbackUsers = mockUsers;
        const allUsers =
          Array.isArray(users) && users.length > 0 ? users : fallbackUsers;

        const user = allUsers.find((user) => user.id === userId);
        if (!user) throw new Error("User not found");

        setFormData({
          username: user.email.split("@")[0],
          email: user.email,
          role: user.role,
          status: "active",
          address: user.addresses || {
            line1: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
          },
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/admin");
      }
    };

    if (userId) fetchUser();
  }, [userId, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof UserFormData] as Record<string, string>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleStatusChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      status: checked ? "active" : "inactive",
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const payload = {
      role: formData.role,
      addresses: {
        line1: formData.address.line1,
        city: formData.address.city,
        state: formData.address.state,
        country: formData.address.country,
        zipCode: formData.address.zipCode,
      },
    };

    try {
      await updateUser(userId, payload);
      router.push("/admin");
    } catch (error) {
      console.error("Failed to update user:", error);
      // Optional: display error toast or message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-gray-800 border-b border-gray-700 shadow-md">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-white">
            <Link href="/">Admin Dashboard</Link>
          </h1>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1">
        <main className="container mx-auto p-4 md:p-6 pt-6">
          {/* Breadcrumb */}
          <div className="flex items-center mb-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white">
              Dashboard
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <Link href="/" className="text-gray-400 hover:text-white">
              Users
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-gray-300">Edit User</span>
          </div>

          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Users
          </Link>

          {/* Edit User Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-2xl bg-gray-800 border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Edit User</CardTitle>
                <CardDescription className="text-gray-400">
                  Update user information and preferences
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-300">
                        Username
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        disabled
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`bg-gray-700 border-gray-600 text-white ${
                          errors.username ? "border-red-500" : ""
                        }`}
                      />
                      {errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.username}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        disabled
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`bg-gray-700 border-gray-600 text-white ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-gray-300">
                        Role
                      </Label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) =>
                          handleSelectChange(value, "role")
                        }
                      >
                        <SelectTrigger
                          className={`bg-gray-700 border-gray-600 text-white ${
                            errors.role ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600 text-white">
                          <SelectItem
                            value="ADMIN"
                            className="hover:bg-gray-600 focus:bg-gray-600"
                          >
                            Admin
                          </SelectItem>
                          <SelectItem
                            value="SELLER"
                            className="hover:bg-gray-600 focus:bg-gray-600"
                          >
                            Seller
                          </SelectItem>
                          <SelectItem
                            value="BUYER"
                            className="hover:bg-gray-600 focus:bg-gray-600"
                          >
                            Buyer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.role && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.role}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="status"
                        checked={formData.status === "active"}
                        onCheckedChange={handleStatusChange}
                      />
                      <Label htmlFor="status" className="text-gray-300">
                        {formData.status === "active" ? "Active" : "Inactive"}
                      </Label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      Address Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="address.line1"
                          className="text-gray-300"
                        >
                          Address Line
                        </Label>
                        <Input
                          id="address.line1"
                          name="address.line1"
                          value={formData.address.line1}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address.city" className="text-gray-300">
                          City
                        </Label>
                        <Input
                          id="address.city"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="address.state"
                          className="text-gray-300"
                        >
                          State
                        </Label>
                        <Input
                          id="address.state"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="address.country"
                          className="text-gray-300"
                        >
                          Country
                        </Label>
                        <Input
                          id="address.country"
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="address.zipCode"
                          className="text-gray-300"
                        >
                          Zip Code
                        </Label>
                        <Input
                          id="address.zipCode"
                          name="address.zipCode"
                          value={formData.address.zipCode}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/")}
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
