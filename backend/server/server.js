import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import verifyController from "./actions/controllers/authentication/verify.js";
import actions from "./actions/index.js";
import events from "./events/index.js";

dotenv.config();
const app = express();

//middleware
app.use(cors());
// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

//actions
app.use("/actions", actions);

//events
app.use("/events", events);

//auth hook
app.use("/verify", verifyController);

app.use("*", (req, res) => {
	res.status(404).json({
		message: "Resource not found",
	});
});

app.listen(3000);
