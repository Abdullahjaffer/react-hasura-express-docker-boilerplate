const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
console.log(process.env.SOME_ENV);

const actions = require("./actions");

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//actions
app.use("/action", actions);

//events
app.use("/events", actions);

app.listen(3000);
