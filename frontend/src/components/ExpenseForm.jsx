import React, { useState, useEffect } from "react";

const ExpenseForm = ({ onSave, editing }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setAmount(editing.amount);
      setCategory(editing.category);
      setDescription(editing.description || "");
      setDate(editing.date.split("T")[0]);
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      window.alert("Please fill all required fields");
      return;
    }
    onSave({
      title,
      amount: Number(amount),
      category,
      description,
      date
    });
    if (!editing) {
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDescription("");
      setDate("");
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{editing ? "Edit Expense" : "Add Expense"}</h3>
      <div className="form-row">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{editing ? "Update" : "Add"}</button>
    </form>
  );
};

export default ExpenseForm;
