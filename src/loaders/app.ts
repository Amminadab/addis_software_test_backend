import express, {
  type Response,
  type Request,
  type NextFunction,
} from "express";
import helmet from "helmet";
import cors from "cors";
import errorHandler from "../utils/geh";
import AppError from "../utils/app_error";

// importing routers
import contactsRouter from "../api/songs/router";

const app: express.Application = express();

// thrid party middleware
app.use(helmet()); // use helmet to secure the app
app.use(cors(
  {
    origin: "*"
  }
)); // to allow cross origin requests

// builtin middleware
app.use(express.json()); // to parse the body of the request
app.use(express.urlencoded({ extended: true }));

// routers
app.use(`/api/v1/songs`, contactsRouter);

// unknown route handler
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Unknown URL", 404));
});

// Global Error Handler
app.use(errorHandler);

export default app;
