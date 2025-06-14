// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// interface CategoryData {
//   name: string;
//   value: number;
// }

// interface CategoryChartProps {
//   data: CategoryData[];
// }

// const COLORS = ["#FF9F43", "#28C76F", "#EA5455", "#7367F0"];

// export function CategoryChart({ data }: CategoryChartProps) {
//   return (
//     <Card className="bg-gray-800 border-gray-700">
//       <CardHeader>
//         <CardTitle className="text-white">Sales by Category</CardTitle>
//         <CardDescription className="text-gray-400">
//           Distribution across categories
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80 flex items-center justify-center">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) =>
//                   `${name} ${(percent * 100).toFixed(0)}%`
//                 }
//               >
//                 {data.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#1F2937",
//                   borderColor: "#374151",
//                   color: "#F9FAFB",
//                 }}
//                 itemStyle={{ color: "#F9FAFB" }}
//                 labelStyle={{ color: "#F9FAFB" }}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  sellerId: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface CategoryChartProps {
  products: Product[];
}

export function CategoryChart({ products }: CategoryChartProps) {
  // Group and count products by category
  const grouped = products.reduce((acc: Record<string, number>, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));

  // Generate dynamic colors
  const COLORS = chartData.map((_, i) => `hsl(${(i * 137.5) % 360}, 70%, 50%)`); // nice golden angle color spacing

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Sales by Category</CardTitle>
        <CardDescription className="text-gray-400">
          Product count per category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                labelLine={false}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
                itemStyle={{ color: "#F9FAFB" }}
                labelStyle={{ color: "#F9FAFB" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
