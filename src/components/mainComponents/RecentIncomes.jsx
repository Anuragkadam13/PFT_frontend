import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { Separator } from "../ui/separator";

const RecentIncomes = ({ transactions, onSeeMore }) => {
  return (
    <div className="h-full grid">
      <Card className="gap-2 py-3.5">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Recent Incomes</CardTitle>
          <CardAction onClick={onSeeMore}>
            <Button variant="secondary" className="text-xs">
              See More <ArrowRight />
            </Button>
          </CardAction>
        </CardHeader>
        <Separator className="mt-1.5" />
        <CardContent>
          {transactions?.length === 0 ? (
            <h1>No transactions available, please add some transactions.</h1>
          ) : (
            ""
          )}
          {transactions?.slice(0, 5)?.map((item) => {
            return (
              <TransactionInfoCard
                key={item._id}
                title={item.source}
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type="income"
                hideDeleteBtn
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentIncomes;
