import express, { Application, NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import browserHistoryRouter from "./routers/browserHistoryRouter";
import indexRouter from "./routers/indexRouter";
import "./db";
import ERROR from "./constants/errorMessage";

const app: Application = express();
const BODY_LIMIT = "50MB";

app.use(morgan("dev"));
app.use(express.json({ limit: BODY_LIMIT }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
  }),
);

app.use("/", indexRouter);
app.use("/browser-history", browserHistoryRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404));
});

app.use((err: Error, req: Request, res: Response): void => {
  res.json({
    result: "error",
    error: { code: 1000, message: ERROR.INTERNAL_SERVER },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`✅ listening on ${process.env.SERVER_URL}`);
});

export default app;
