"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SalesData {
  name: string;
  sales: number;
}

interface SalesChartProps {
  data: SalesData[];
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-white">Sales Overview</CardTitle>
        <CardDescription className="text-gray-400">
          Monthly sales performance
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
                itemStyle={{ color: "#F9FAFB" }}
                labelStyle={{ color: "#F9FAFB" }}
              />
              <Bar dataKey="sales" fill="#FF9F43" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
