import incomeContext from "@/context/income/IncomeContext";
import UserContext from "@/context/user/UserContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import IncomeOverview from "./IncomeOverview";
import IncomeList from "./IncomeList";
import LoadingContext from "@/context/Loader/LoadingContext";

const Income = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { fetchUser, dashboardData } = context;
  const contextIncome = useContext(incomeContext);
  const { transactions, addIncome, fetchIncomes, deleteIncome } = contextIncome;
  const loadContext = useContext(LoadingContext);
  const { showLoading, hideLoading } = loadContext;

  useEffect(() => {
    const loadAllIncomeRelatedData = async () => {
      showLoading();
      try {
        if (localStorage.getItem("token")) {
          await fetchUser();
          await dashboardData();
          await fetchIncomes();
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
      <div className="grid grid-cols-1 gap-6 max-sm:gap-3">
        <IncomeOverview transactions={transactions} addIncome={addIncome} />
        <IncomeList transactions={transactions} deleteIncome={deleteIncome} />
      </div>
    </div>
  );
};

export default Income;
