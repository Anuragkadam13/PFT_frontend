import React, { useEffect, useState } from "react";
import PieChartDonut from "../customComponents/PieChartDonut";

const Last60daysIncome = ({ data, totalIncome }) => {
  const COLORS = [
    "oklch(70.2% 0.183 293.541)",
    "oklch(70.4% 0.191 22.216)",
    "oklch(75% 0.183 55.934)",
    "oklch(67.3% 0.182 276.935)",
  ];
  const [chartData, setchartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setchartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div>
      <PieChartDonut
        title="Last 60 Days Income"
        data={chartData}
        label="Total Income"
        totalAmount={totalIncome}
        colors={COLORS}
      />
    </div>
  );
};

export default Last60daysIncome;
