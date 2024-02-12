"use strict";
const express = require("express");
const pasajero = require("./v1/routes/pasajero.routers.js");
const conductor = require("./v1/routes/conductor.routers.js");
// const confirmPayment = require("./v1/routes/confirmPayment.routers.js");
require("dotenv").config();
const initDB = require("./config/db");

const PORT = process.env.PORT || 4000;
const app = express();

//Settings
app.listen(PORT, () => initDB());
console.log("Server running on port", PORT);
app.use(express.json());

//Middlewares

// Middleware para permitir CORS
app.use(function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routes
app.use(pasajero);
app.use(conductor);

app.use((req, res) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});
