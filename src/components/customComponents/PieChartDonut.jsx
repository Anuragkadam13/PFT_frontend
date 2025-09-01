import * as React from "react";
import {
  Label,
  Pie,
  PieChart,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatAbbreviatedNumber } from "../utils/NumberFormatter";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const PieChartDonut = ({ data, title, label, totalAmount, colors }) => {
  const displayTotalBalance = formatAbbreviatedNumber(totalAmount);
  return (
    <div className="h-full grid">
      <Card className="flex flex-col gap-0 md:gap-3 ">
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {data?.length === 0 ? (
            <h1 className="my-1">No incomes added in last 60 days</h1>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="name"
                  innerRadius={75}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-2xl font-bold"
                            >
                              ₹{displayTotalBalance}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="text-sm font-medium fill-muted-foreground"
                            >
                              {label}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PieChartDonut;
