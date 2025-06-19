import expenseContext from "@/context/expense/ExpenseContext";
import UserContext from "@/context/user/UserContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import ExpenseOverview from "./ExpenseOverview";
import ExpenseList from "./ExpenseList";
import LoadingContext from "@/context/Loader/LoadingContext";
const Expense = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { fetchUser, dashboardData } = context;
  const contextExpense = useContext(expenseContext);
  const { fetchExpenses, addExpense, deleteExpense, transactions } =
    contextExpense;
  const loadContext = useContext(LoadingContext);
  const { showLoading, hideLoading, isLoading } = loadContext;

  useEffect(() => {
    const loadAllIncomeRelatedData = async () => {
      showLoading();
      try {
        if (localStorage.getItem("token")) {
          await fetchUser();
          await dashboardData();
          await fetchExpenses();
        } else {
          hideLoading();
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Error loading income data in Income.jsx:", error);
      } finally {
        hideLoading();
      }
    };
    loadAllIncomeRelatedData();
  }, []);

  return (
    <div className="pt-14 sm:pt-16">
      {!isLoading && (
        <div className="grid grid-cols-1 gap-6 max-sm:gap-3">
          <ExpenseOverview
            transactions={transactions}
            addExpense={addExpense}
          />
          <ExpenseList
            transactions={transactions}
            deleteExpense={deleteExpense}
          />
        </div>
      )}
    </div>
  );
};

export default Expense;
