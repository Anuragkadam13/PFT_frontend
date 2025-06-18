import UserContext from "@/context/user/UserContext";
import React, { useContext, useEffect } from "react";
import emptyBGImg from "@/assets/emptyBG.png";
import { useNavigate } from "react-router";
import { HandCoins, Wallet, WalletMinimal } from "lucide-react";
import RecentTransactions from "./RecentTransactions";
import FinanceOverview from "./FinanceOverview";
import ExpenseTransactions from "./ExpenseTransactions";
import Last30DaysExpenses from "./Last30DaysExpenses";
import Last60daysIncome from "./Last60daysIncome";
import RecentIncomes from "./RecentIncomes";
import { Button } from "../ui/button";
import { useLoading } from "@/context/LoadingContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { fetchUser, user, dashboardData, dashboarddata } = context;
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    const loadDashboardData = async () => {
      showLoading();

      try {
        if (localStorage.getItem("token")) {
          await fetchUser();
          await dashboardData();
        } else {
          hideLoading();
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        hideLoading();
      }
    };

    loadDashboardData();
  }, [fetchUser, dashboardData, navigate, showLoading, hideLoading]);

  if (!user || !dashboarddata) {
    return null;
  }
  const hasFinancialData =
    dashboarddata.totalBalance ||
    dashboarddata.totalExpense ||
    dashboarddata.totalIncome;

  return (
    <div className="pt-14 sm:pt-16">
      {hasFinancialData ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-sm:gap-3 ">
          {/* Net Balance */}
          <div className="px-4 py-2 bg-green-100 border border-green-300 rounded-lg shadow flex items-center gap-4">
            <div className="rounded-full bg-green-700 text-white p-3">
              <Wallet />
            </div>
            <div>
              <h2 className="text-md font-semibold text-green-700">
                Total Balance
              </h2>
              <p className="text-xl font-bold text-green-800">
                ₹{dashboarddata.totalBalance}
              </p>
            </div>
          </div>

          {/* Total Income */}
          <div className="px-4 py-2 bg-blue-100 border border-blue-300 rounded-lg shadow flex items-center gap-4">
            <div className="rounded-full bg-blue-700 text-white p-3">
              <WalletMinimal />
            </div>
            <div>
              <h2 className="text-md font-semibold text-blue-700">
                Total Income
              </h2>
              <p className="text-xl font-bold text-blue-800">
                ₹{dashboarddata.totalIncome}
              </p>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="px-4 py-2 bg-red-100 border border-red-300 rounded-lg shadow flex items-center gap-4">
            <div className="rounded-full bg-red-700 text-white p-3">
              <HandCoins />
            </div>
            <div>
              <h2 className="text-md font-semibold text-red-700">
                Total Expense
              </h2>
              <p className="text-xl font-bold text-red-800">
                ₹{dashboarddata.totalExpense}
              </p>
            </div>
          </div>
          <RecentTransactions
            transactions={dashboarddata?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboarddata?.totalBalance || 0}
            totalIncome={dashboarddata?.totalIncome || 0}
            totalExpense={dashboarddata?.totalExpense || 0}
          />
          <ExpenseTransactions
            transactions={dashboarddata?.last30DaysExpense.transactions}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
            data={dashboarddata?.last30DaysExpense?.transactions || []}
          />
          <Last60daysIncome
            data={
              dashboarddata?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashboarddata?.totalIncome || 0}
          />
          <RecentIncomes
            transactions={dashboarddata?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <h1 className="text-2xl font-medium">
            A Fresh Start for Your Finances
          </h1>
          <img
            src={emptyBGImg}
            alt="No data available"
            className="w-72 md:w-100 h-auto opacity-80"
          />
          <p className="text-md text-gray-600 text-center">
            No data found yet. Let's populate this space with your income and
            expenses to give you a clear overview. <br />
            Start tracking by adding a new transaction.{" "}
            <Button
              variant="link"
              className="px-1 text-sm"
              onClick={() => {
                navigate("/income");
              }}
            >
              Get started
            </Button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
