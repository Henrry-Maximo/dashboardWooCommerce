const orderRoutes = require("./src/routes/orders");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use("/mov-painel", orderRoutes);

try {
  app.listen(PORT, () => {
    console.log(`Server Is Running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(`Server Is Not Running: ${error.message}`);
}

