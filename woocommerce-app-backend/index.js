const apiRoutes = require("./src/routes/apiRoutes");
const express = require("express");
const cors = require("cors");

const os = require("node:os"); // module provides operating system-related utility methods and properties.
const networkAddress = os.networkInterfaces(); // object containing network interfaces 

const app = express();
app.use(cors());

app.use("/", apiRoutes);

// port 
const port = 5000;
app.listen(port, () => {
  console.log(`Servidor iniciado: ${networkAddress.Ethernet[0].address}:${port}`);
});
