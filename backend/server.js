const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Smart Expense Tracker API is running" });
});

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/expenses", require("./src/routes/expenseRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
