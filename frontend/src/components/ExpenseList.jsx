import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <div className="card">
      <h3>Expenses</h3>
      {expenses.length === 0 && <p>No expenses yet.</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e._id}>
              <td>{e.title}</td>
              <td>{e.category}</td>
              <td>{e.amount}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEdit(e)}>
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete this expense?")) {
                      onDelete(e._id);
                    }
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
