import express from "express";
import handleRouter from "./routers/handlerRouter.js"
import cors from "cors"
import rateLimit from "express-rate-limit";

export const app = express();

app.use(express.json());

const corsOptions = {
    methods: "POST",
    allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));

const apiLimitter = rateLimit({
    windowMs: 1 * 30 * 1000,
    max: 3,
    message: 'To many request, try again in 30 second'
});

app.use("/api", handleRouter, apiLimitter);