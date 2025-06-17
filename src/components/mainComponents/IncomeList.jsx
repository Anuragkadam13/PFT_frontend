import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, deleteIncome }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Income Sources</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
          {transactions?.length === 0 ? <h1>No data available</h1> : ""}
          {transactions?.map((income) => {
            return (
              <TransactionInfoCard
                key={income._id}
                title={income.source}
                date={moment(income.date).format("Do MMM YYYY")}
                amount={income.amount}
                type="income"
                onDelete={() => deleteIncome(income._id)}
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeList;
