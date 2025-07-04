import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { formatAbbreviatedNumber } from "../utils/NumberFormatter";
const CustomLineChart = ({ data, color }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const displayValue = formatAbbreviatedNumber(payload[0].payload.amount);
      return (
        <div className="bg-white shadow-md rounded-lg p-2 ">
          <p className="text-xs font-semibold mb-1 text-black">
            {payload[0].payload.category}
          </p>
          <p className="text-xs text-gray-600">
            Amount
            <span className="text-xs font-medium text-gray-900 ml-3">
              {displayValue}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={CustomTooltip} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={color}
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
