import React, { useEffect, useState } from "react";
import CustomBarChart from "../customComponents/CustomBarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Last30DaysExpenses = ({ data = [] }) => {
  const [chartData, setchartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data.map((item) => ({
      category: item?.category,
      amount: item?.amount,
    }));

    setchartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div className="h-full grid">
      <Card className="pb-0">
        <CardHeader>
          <CardTitle>Last 30 Days Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.length === 0 ? (
            <h1 className="mb-2">No transactions done in last 30 days.</h1>
          ) : (
            <CustomBarChart data={chartData} color="var(--chart-1)" />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Last30DaysExpenses;
