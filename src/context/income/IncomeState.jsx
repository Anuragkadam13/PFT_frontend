import React, { useState } from "react";
import incomeContext from "./IncomeContext";

const IncomeState = (props) => {
  const [transactions, setTransactions] = useState([]);

  //Fetch all Incomes
  const fetchIncomes = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/income/getAllIncomes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const json = await response.json();
      if (json) {
        setTransactions(json);
      } else {
        console.log("No transactions Available");
      }
    } catch (error) {
      console.error("Failed to fetch Transactions", error);
    }
  };

  //Add Transactions
  const addIncome = async (source, amount, date) => {
    //API Call
    const response = await fetch("http://127.0.0.1:5000/api/income/addIncome", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ source, amount, date }),
    });

    const income = await response.json();
    setTransactions(transactions.concat(income));
    fetchIncomes();
  };

  //Delete Income
  const deleteIncome = async (id) => {
    //API Call
    const response = await fetch(
      `http://127.0.0.1:5000/api/income/deleteIncome/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = response.json();
    const newTransactions = transactions.filter((transaction) => {
      return transaction._id !== id;
    });
    setTransactions(newTransactions);
    fetchIncomes();
  };
  return (
    <incomeContext.Provider
      value={{ transactions, addIncome, fetchIncomes, deleteIncome }}
    >
      {props.children}
    </incomeContext.Provider>
  );
};

export default IncomeState;
