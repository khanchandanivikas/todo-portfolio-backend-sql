const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const rutasTodo = require("./routes/rutas-todo");
app.use("/api/todoPortfolio", rutasTodo);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "ha occurido un error desconocido",
  });
});

const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
  console.log(`escuchando en porto ${PORT}`);
});
