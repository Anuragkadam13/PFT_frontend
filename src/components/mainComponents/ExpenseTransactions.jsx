import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { Separator } from "../ui/separator";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="h-full grid">
      <Card className="gap-2 py-3.5">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Expenses</CardTitle>
          <CardAction onClick={onSeeMore}>
            <Button variant="secondary" className="text-xs">
              See More <ArrowRight />
            </Button>
          </CardAction>
        </CardHeader>
        <Separator className="mt-1.5" />
        <CardContent>
          {transactions?.slice(0, 5)?.map((item) => {
            return (
              <TransactionInfoCard
                key={item._id}
                title={item.category}
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type="expense"
                hideDeleteBtn
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTransactions;
