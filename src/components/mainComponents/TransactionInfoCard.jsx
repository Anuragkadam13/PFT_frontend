import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatAbbreviatedNumber } from "../utils/NumberFormatter";

const TransactionInfoCard = ({
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () => {
    return type === "income"
      ? "bg-green-50 text-green-600"
      : "bg-red-50 text-red-600";
  };

  const displayAmount = formatAbbreviatedNumber(amount);
  return (
    <div>
      <Card className="mt-2 py-2 border-0 shadow-none bg-neutral-50">
        <CardContent className="flex justify-between items-center ">
          <div>
            <h6 className="text-sm  font-semibold">{title}</h6>
            <h6 className="text-xs font-medium text-gray-400">{date}</h6>
          </div>
          <div className="flex items-center">
            <div
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
            >
              <h6 className="text-xs font-semibold flex items-center">
                {type === "income" ? (
                  <Plus size={12} strokeWidth={2.5} />
                ) : (
                  <Minus size={12} strokeWidth={2.5} />
                )}{" "}
                ₹{displayAmount}
              </h6>
              {type === "income" ? (
                <TrendingUp className="h-4" />
              ) : (
                <TrendingDown className="h-4" />
              )}
            </div>
            {!hideDeleteBtn && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Trash2
                    strokeWidth={1.5}
                    className="h-4 text-neutral-400 hover:text-red-500 hover:cursor-pointer"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your transaction.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onDelete();
                        toast.success("Transaction Deleted");
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionInfoCard;
