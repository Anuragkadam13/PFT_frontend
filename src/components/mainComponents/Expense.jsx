import expenseContext from "@/context/expense/ExpenseContext";
import UserContext from "@/context/user/UserContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import ExpenseOverview from "./ExpenseOverview";
import ExpenseList from "./ExpenseList";
const Expense = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { fetchUser, dashboardData } = context;
  const contextExpense = useContext(expenseContext);
  const { fetchExpenses, addExpense, deleteExpense, transactions } =
    contextExpense;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUser();
      dashboardData();
      fetchExpenses();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="pt-14 sm:pt-16">
      <div className="grid grid-cols-1 gap-6 max-sm:gap-3">
        <ExpenseOverview transactions={transactions} addExpense={addExpense} />
        <ExpenseList
          transactions={transactions}
          deleteExpense={deleteExpense}
        />
      </div>
    </div>
  );
};

export default Expense;
