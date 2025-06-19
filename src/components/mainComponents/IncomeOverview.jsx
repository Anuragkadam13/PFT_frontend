import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import CustomBarChart from "../customComponents/CustomBarChart";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import LoadingContext from "@/context/Loader/LoadingContext";

const IncomeOverview = ({ transactions, addIncome }) => {
  const loadContext = useContext(LoadingContext);
  const { showLoading, hideLoading, isLoading } = loadContext;
  const [chartData, setchartData] = useState([]);
  const [open, setOpen] = useState(false);
  const [income, setIncome] = useState({
    source: "",
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
      source: item?.source,
      amount: item?.amount,
    }));

    setchartData(dataArr);
  };

  useEffect(() => {
    prepareChartData(transactions);
  }, [transactions]);

  const onChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    refClose.current.click();
    try {
      await addIncome(income.source, income.amount, income.date);
      setIncome({
        source: "",
        amount: "",
        date: new Date(),
      });

      toast.success("Income Added");
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income. Please try again.");
    } finally {
      hideLoading();
    }
  };
  return (
    <div className="h-full grid">
      {!isLoading && (
        <Card className="pb-0">
          <CardHeader>
            <CardTitle>Income Overview</CardTitle>
            <CardDescription>
              Track your earnings over time and analyze your income trends.
            </CardDescription>
            <CardAction>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-1">
                    <Plus />
                    Add Income
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Income</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="grid gap-1">
                        <Label htmlFor="source">Income Source</Label>
                        <Input
                          value={income.source}
                          onChange={onChange}
                          id="source"
                          name="source"
                          required
                          placeholder="Source"
                        />
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          type="number"
                          value={income.amount}
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
                              {income.date
                                ? moment(income.date).format("DD/MM/YYYY")
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
                              selected={income.date}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setIncome({ ...income, date: date });
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
                      <Button
                        variant="outline"
                        className="hidden"
                        ref={refClose}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardAction>
          </CardHeader>
          <CardContent>
            {chartData.length !== 0 ? (
              <CustomBarChart data={chartData} color="var(--chart-2)" />
            ) : (
              <h1 className="mb-5 ">
                No data available, please add some transaction to proceed
              </h1>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IncomeOverview;
