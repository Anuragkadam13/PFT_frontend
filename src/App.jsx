import { Route, Routes } from "react-router";
import Dashboard from "./components/mainComponents/Dashboard";
import Navbar from "./components/mainComponents/Navbar";
import Expense from "./components/mainComponents/Expense";
import Income from "./components/mainComponents/Income";
import LoginSignup from "./components/Auth/LoginSignup";
import UserState from "./context/user/UserState";
import IncomeState from "./context/income/IncomeState";
import ExpenseState from "./context/expense/ExpenseState";
import { LoadingProvider } from "./context/LoadingContext";
import Loader from "./components/customComponents/Loader";

function App() {
  return (
    <>
      <LoadingProvider>
        <UserState>
          <IncomeState>
            <ExpenseState>
              <Navbar />
              <Loader />
              <div className="py-5 px-2 sm:p-5 ">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={<LoginSignup />} />
                  <Route path="/income" element={<Income />} />
                  <Route path="/expense" element={<Expense />} />
                </Routes>
              </div>
            </ExpenseState>
          </IncomeState>
        </UserState>
      </LoadingProvider>
    </>
  );
}

export default App;
