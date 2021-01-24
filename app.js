const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const VehiculeRouter = require("./router/vehicule");
const ConcessionaireRouter = require("./router/concessionaire");
const OwnerRouter = require("./router/owner");
app.use(bodyparser.json());

app.use(VehiculeRouter);
app.use(ConcessionaireRouter);
app.use(OwnerRouter);

app.listen(3000);






