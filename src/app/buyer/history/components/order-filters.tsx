"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, SortAsc, SortDesc, X } from "lucide-react";
import { useState } from "react";

export interface OrderFilters {
  status: string;
  dateRange: {
    from: string;
    to: string;
  };
  minAmount: string;
  maxAmount: string;
  searchTerm: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface OrderFiltersProps {
  filters: OrderFilters;
  onFiltersChange: (filters: OrderFilters) => void;
  onClearFilters: () => void;
  orderCount: number;
}

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

const sortOptions = [
  { value: "createdAt", label: "Order Date" },
  { value: "total", label: "Total Amount" },
  { value: "orderNumber", label: "Order Number" },
  { value: "status", label: "Status" },
];

export default function OrderFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  orderCount,
}: OrderFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilter = (key: keyof OrderFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const updateDateRange = (field: "from" | "to", value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    });
  };

  const toggleSortOrder = () => {
    onFiltersChange({
      ...filters,
      sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status !== "all") count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.minAmount || filters.maxAmount) count++;
    if (filters.searchTerm) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-4">
      {/* Search and Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md"></div>

        <div className="flex items-center gap-2">
          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <Select
              value={filters.sortBy}
              onValueChange={(value) => updateFilter("sortBy", value)}
            >
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleSortOrder}
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              {filters.sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Filter Toggle */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-orange-500 text-white">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 bg-gray-800 border-gray-700"
              align="end"
            >
              <Card className="bg-transparent border-0 shadow-none">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Filter Orders</CardTitle>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status Filter */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Status</Label>
                    <Select
                      value={filters.status}
                      onValueChange={(value) => updateFilter("status", value)}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600 text-white">
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Range Filter */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-gray-400">From</Label>
                        <Input
                          type="date"
                          value={filters.dateRange.from}
                          onChange={(e) =>
                            updateDateRange("from", e.target.value)
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">To</Label>
                        <Input
                          type="date"
                          value={filters.dateRange.to}
                          onChange={(e) =>
                            updateDateRange("to", e.target.value)
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Amount Range Filter */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Amount Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-gray-400">Min ($)</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={filters.minAmount}
                          onChange={(e) =>
                            updateFilter("minAmount", e.target.value)
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">Max ($)</Label>
                        <Input
                          type="number"
                          placeholder="1000"
                          value={filters.maxAmount}
                          onChange={(e) =>
                            updateFilter("maxAmount", e.target.value)
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-400">Active filters:</span>

          {filters.status !== "all" && (
            <Badge variant="secondary" className="bg-gray-700 text-white">
              Status:{" "}
              {statusOptions.find((s) => s.value === filters.status)?.label}
              <button
                onClick={() => updateFilter("status", "all")}
                className="ml-1 hover:text-gray-300"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {(filters.dateRange.from || filters.dateRange.to) && (
            <Badge variant="secondary" className="bg-gray-700 text-white">
              Date: {filters.dateRange.from || "..."} to{" "}
              {filters.dateRange.to || "..."}
              <button
                onClick={() => {
                  updateDateRange("from", "");
                  updateDateRange("to", "");
                }}
                className="ml-1 hover:text-gray-300"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {(filters.minAmount || filters.maxAmount) && (
            <Badge variant="secondary" className="bg-gray-700 text-white">
              Amount: ${filters.minAmount || "0"} - ${filters.maxAmount || "∞"}
              <button
                onClick={() => {
                  updateFilter("minAmount", "");
                  updateFilter("maxAmount", "");
                }}
                className="ml-1 hover:text-gray-300"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.searchTerm && (
            <Badge variant="secondary" className="bg-gray-700 text-white">
              Search: "{filters.searchTerm}"
              <button
                onClick={() => updateFilter("searchTerm", "")}
                className="ml-1 hover:text-gray-300"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-400">
        Showing {orderCount} order{orderCount !== 1 ? "s" : ""}
        {activeFiltersCount > 0 && " (filtered)"}
      </div>
    </div>
  );
}
