const express = require("express");
const router = express.Router();

// Controller
const { finish_travel } = require("./../controllers/travel_request.js");
const { payment_request } = require("./../controllers/payment_request.js");
// Middleware
const { checkRoleAuth } = require("../middleware/checkRoleAuth");

//Finalizar viaje, retorna el costo del viaje
router.post(
  "/api/v1/end_trip/:id_travel/:kilometres",
  checkRoleAuth([1]),
  finish_travel
);

//Pagar el costo del viaje
router.post("/api/v1/pay_fare/:id_travel", checkRoleAuth([1]), payment_request);

module.exports = router;
