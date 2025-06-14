"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeValue: string;
  icon: LucideIcon;
  iconColor: string;
  isPositive?: boolean;
}

export function MetricCard({
  title,
  value,
  change,
  changeValue,
  icon: Icon,
  iconColor,
  isPositive = true,
}: MetricCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`${iconColor} p-3 rounded-lg`}>
            <Icon className="h-6 w-6" />
          </div>
          <Badge
            className={`${
              isPositive
                ? "bg-green-900/30 text-green-400"
                : "bg-red-900/30 text-red-400"
            } flex items-center gap-1`}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {change}%
          </Badge>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
        <div className="mt-4 flex items-center text-xs text-gray-400">
          {isPositive ? (
            <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-400 mr-1" />
          )}
          <span className={isPositive ? "text-green-400" : "text-red-400"}>
            {changeValue}
          </span>
          <span className="ml-1">from last period</span>
        </div>
      </CardContent>
    </Card>
  );
}
