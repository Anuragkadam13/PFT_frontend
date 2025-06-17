import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import moment from "moment";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import CustomLineChart from "../customComponents/CustomLineChart";
const ExpenseOverview = ({ transactions, addExpense }) => {
  const [chartData, setchartData] = useState([]);
  const [open, setOpen] = useState(false);
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: new Date(),
  });

  const refClose = useRef(null);

  const prepareChartData = (transactions = []) => {
    const sortedData = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const dataArr = sortedData.map((item) => ({
      month: moment(item?.date).format("Do MMM"),
      category: item?.category,
      amount: item?.amount,
    }));

    setchartData(dataArr);
  };

  useEffect(() => {
    prepareChartData(transactions);
  }, [transactions]);

  const onChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(expense.category, expense.amount, expense.date);
    setExpense({
      category: "",
      amount: "",
      date: new Date(),
    });
    refClose.current.click();
    toast.success("Expense Added");
  };
  return (
    <div className="h-full grid">
      <Card className="pb-0">
        <CardHeader>
          <CardTitle>Expense Overview</CardTitle>
          <CardDescription>
            Track your spending trends over time and gain insights into where
            your money goes.
          </CardDescription>
          <CardAction>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="gap-1">
                  <Plus />
                  Add expense
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Expense</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <Label htmlFor="category">Expense category</Label>
                      <Input
                        value={expense.category}
                        onChange={onChange}
                        id="category"
                        name="category"
                        required
                        placeholder="Category"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        type="number"
                        value={expense.amount}
                        onChange={onChange}
                        id="amount"
                        name="amount"
                        placeholder="Amount"
                        required
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="date" className="px-1">
                        Date
                      </Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-48 justify-between font-normal"
                          >
                            {expense.date
                              ? moment(expense.date).format("DD/MM/YYYY")
                              : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={expense.date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              setExpense({ ...expense, date: date });
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    Add
                  </Button>
                </form>
                <DialogFooter className="hidden">
                  <DialogClose asChild>
                    <Button variant="outline" className="hidden" ref={refClose}>
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent>
          {chartData.length != 0 ? (
            <CustomLineChart data={chartData} color="var(--chart-1)" />
          ) : (
            <h1 className="mb-5">
              No data available, please add some transaction to proceed
            </h1>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseOverview;
