import React from "react";
import { Chrono } from "react-chrono";

const Timeline = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="card">
        <h3>Expense Timeline</h3>
        <p>No expenses yet.</p>
      </div>
    );
  }

  const items = expenses
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((e) => ({
      title: new Date(e.date).toLocaleDateString(),
      cardTitle: e.title,
      cardSubtitle: `${e.category} - ₹${e.amount}`,
      cardDetailedText: e.description || ""
    }));

  return (
    <div className="card">
      <h3>Expense Timeline</h3>
      <div style={{ width: "100%", height: "300px" }}>
        <Chrono items={items} mode="HORIZONTAL" />
      </div>
    </div>
  );
};

export default Timeline;
