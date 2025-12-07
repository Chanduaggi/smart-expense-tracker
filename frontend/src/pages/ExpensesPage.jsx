import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Filters from "../components/Filters";

const ExpensesPage = () => {
  const { api } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadExpenses = async () => {
    const res = await api.get("/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    loadExpenses().catch((err) => console.error(err));
  }, []);

  const handleSave = async (expense) => {
    if (editing) {
      await api.put(`/expenses/${editing._id}`, expense);
      window.alert("Expense updated!");
      setEditing(null);
    } else {
      await api.post("/expenses", expense);
      window.alert("Expense created!");
    }
    loadExpenses();
  };

  const handleDelete = async (id) => {
    await api.delete(`/expenses/${id}`);
    window.alert("Expense deleted!");
    loadExpenses();
  };

  const handleFilter = async ({ category, month }) => {
    const res = await api.get("/expenses/filter", {
      params: { category, month }
    });
    setExpenses(res.data);
  };

  const handleSearch = async (keyword) => {
    const res = await api.get("/expenses/search", { params: { keyword } });
    setExpenses(res.data);
  };

  const handleSort = async (by) => {
    const res = await api.get("/expenses/sort", { params: { by } });
    setExpenses(res.data);
  };

  const handleClearAll = async () => {
    if (window.confirm("Clear all expenses? This cannot be undone.")) {
      await api.delete("/expenses");
      loadExpenses();
    }
  };

  return (
    <div className="page">
      <h1>Expenses</h1>
      <button className="danger-btn" onClick={handleClearAll}>
        Clear All
      </button>
      <Filters
        onFilter={handleFilter}
        onSearch={handleSearch}
        onSort={handleSort}
      />
      <ExpenseForm onSave={handleSave} editing={editing} />
      <ExpenseList
        expenses={expenses}
        onEdit={(e) => setEditing(e)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ExpensesPage;
