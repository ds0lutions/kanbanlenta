const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// leidzia skirtingiems portams bendrauti (5173 ir backendo 5000)
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Serveris veikia!");
});

// tasks route
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Prisijungta prie MongoDB"))
  .catch((err) => console.log("Klaida jungiantis:", err));

// 5000 - backendo portas ir servo paleidimas
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveris veikia ant porto ${PORT}`));
