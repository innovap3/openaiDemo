import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import indexRouter from "./routes/index";
import productsRouter from "./routes/products";

const app = express();

app.use(cors({ origin: /^http:\/\/localhost:.*/ }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/products", productsRouter);

export default app;
