import React from "react";
import PieChartDonut from "../customComponents/PieChartDonut";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];
  const balanceData = [
    {
      name: "Total Expense",
      amount: totalExpense,
    },
    { name: "Total Income", amount: totalIncome },
    {
      name: "Total Balance",
      amount: totalBalance,
    },
  ];

  return (
    <div>
      <PieChartDonut
        data={balanceData}
        title="Finance Overview"
        label="Total Balance"
        totalAmount={totalBalance}
        colors={COLORS}
      />
    </div>
  );
};

export default FinanceOverview;
