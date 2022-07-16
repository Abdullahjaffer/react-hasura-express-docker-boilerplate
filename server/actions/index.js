import express from "express";
import authenticationRouter from "./authentication/index.js";

const router = express.Router();

router.use("/authentication", authenticationRouter);

export default router;
