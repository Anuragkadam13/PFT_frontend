import React, { useState } from "react";
import expenseContext from "./ExpenseContext";

const ExpenseState = (props) => {
  const [transactions, setTransactions] = useState([]);

  //Fetch all Expenses
  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        "https://pft-backend-wine.vercel.app/api/expense/getAllExpenses",
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
  const addExpense = async (category, amount, date) => {
    //API Call
    const response = await fetch(
      "https://pft-backend-wine.vercel.app/api/expense/addExpense",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ category, amount, date }),
      }
    );

    const expense = await response.json();
    setTransactions(transactions.concat(expense));
    fetchExpenses();
  };

  //Delete Income
  const deleteExpense = async (id) => {
    //API Call
    const response = await fetch(
      `https://pft-backend-wine.vercel.app/api/expense/deleteExpense/${id}`,
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
    fetchExpenses();
  };
  return (
    <expenseContext.Provider
      value={{ fetchExpenses, addExpense, deleteExpense, transactions }}
    >
      {props.children}
    </expenseContext.Provider>
  );
};

export default ExpenseState;
