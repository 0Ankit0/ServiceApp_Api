import express from "express";
import Cors from "cors";
import userRouter from "./userRoute.js";
import { protect } from "../Middleware/auth.js";
import uploadRouter from "./uploadRouter.js";
import mailRouter from "./mailRouter.js";
import { setupChangeStream } from '../Middleware/ChangeStream.js';
import feedbackRouter from "./feedbackRoute.js";
import serviceRouter from "./serviceRoute.js";
import requestRouter from "./requestRoute.js";

var app = express();
app.use(Cors());
app.use(express.json());
app.get("/", async (req, res) => {
    res.send("Welcome to the home page");
});
app.use('/user', userRouter);
app.use('/request', protect, setupChangeStream, requestRouter);
app.use('/feedback', protect, feedbackRouter);
app.use('/service', protect, serviceRouter);
app.use('/upload', protect, uploadRouter);
app.use('/sendmail', protect, mailRouter);
export default app;