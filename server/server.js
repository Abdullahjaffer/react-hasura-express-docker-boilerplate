import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import actions from "./actions/index.js";

dotenv.config();
const app = express();

//middleware
app.use(cors());

//actions
app.use("/actions", actions);

//events
app.use("/events", actions);

app.use("*", (req, res) => {
	console.log(req);
});

app.listen(3000);
