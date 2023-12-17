const orderRoutes = require("./src/routes/orders");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/mov-painel", orderRoutes);
const port = 5000;
app.listen(port, () => {
  console.log(`Server Running: ${port}`);
});
