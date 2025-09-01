import incomeContext from "@/context/income/IncomeContext";
import UserContext from "@/context/user/UserContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import IncomeOverview from "./IncomeOverview";
import IncomeList from "./IncomeList";

const Income = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { fetchUser, dashboardData } = context;
  const contextIncome = useContext(incomeContext);
  const { incomeTransactions, addIncome, fetchIncomes, deleteIncome } =
    contextIncome;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUser();
      dashboardData();
      fetchIncomes();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="pt-14 sm:pt-16">
      <div className="grid grid-cols-1 gap-6 max-sm:gap-3">
        <IncomeOverview
          transactions={incomeTransactions}
          addIncome={addIncome}
        />
        <IncomeList
          transactions={incomeTransactions}
          deleteIncome={deleteIncome}
        />
      </div>
    </div>
  );
};

export default Income;
