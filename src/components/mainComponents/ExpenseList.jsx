import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const ExpenseList = ({ transactions, deleteExpense }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>All Expenses</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
          {transactions?.length === 0 ? <h1>No data available</h1> : ""}
          {transactions?.map((expense) => {
            return (
              <TransactionInfoCard
                key={expense._id}
                title={expense.category}
                date={moment(expense.date).format("Do MMM YYYY")}
                amount={expense.amount}
                type="expense"
                onDelete={() => deleteExpense(expense._id)}
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseList;
