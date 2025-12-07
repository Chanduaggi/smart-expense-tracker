import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Charts from "../components/Charts";
import Timeline from "../components/Timeline";

const Dashboard = () => {
  const { api } = useAuth();
  const [summary, setSummary] = useState(null);
  const [stats, setStats] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [summaryRes, statsRes, expensesRes] = await Promise.all([
        api.get("/expenses/summary"),
        api.get("/expenses/statistics"),
        api.get("/expenses")
      ]);
      setSummary(summaryRes.data);
      setStats(statsRes.data);
      setRecent(expensesRes.data.slice(0, 5));
    };
    fetchData().catch((err) => console.error(err));
  }, [api]);

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <div className="grid">
        <div className="card">
          <h3>Summary</h3>
          <p>Total Expenses: ₹{summary?.totalAmount || 0}</p>
          <p>Total Transactions: {summary?.count || 0}</p>
        </div>
        <Charts stats={stats} />
        <Timeline expenses={recent} />
      </div>
    </div>
  );
};

export default Dashboard;
