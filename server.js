const express = require("express");
const pool = require("./db");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies

app.get("/hogwarts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM houses");

    console.table(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch houses:", error.message);
    res.status(500).json({ error: "Could not fetch houses" });
  }
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    res.json({ connected: true, currentTime: result.rows[0].current_time });
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
    res.status(503).json({ connected: false, error: "Database unavailable" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
