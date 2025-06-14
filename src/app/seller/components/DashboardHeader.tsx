"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package } from "lucide-react";

interface DashboardHeaderProps {
  onPeriodChange?: (period: string) => void;
}

export function DashboardHeader({ onPeriodChange }: DashboardHeaderProps) {
  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-gray-800 border-b border-gray-700 shadow-md">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-white">Seller Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              <Package className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Overview</h1>
          <p className="text-gray-400 mt-1">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Tabs
            defaultValue="7days"
            className="w-full"
            onValueChange={onPeriodChange}
          >
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger
                value="7days"
                className="data-[state=active]:bg-gray-700"
              >
                7 days
              </TabsTrigger>
              <TabsTrigger
                value="30days"
                className="data-[state=active]:bg-gray-700"
              >
                30 days
              </TabsTrigger>
              <TabsTrigger
                value="90days"
                className="data-[state=active]:bg-gray-700"
              >
                90 days
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </>
  );
}
