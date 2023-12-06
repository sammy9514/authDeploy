import { Application, Request, Response } from "express";
import auth from "./router/userRouter";
import product from "./router/productRouter";
import ratings from "./router/ratingRouter";
export const MainApp = (app: Application) => {
  app.use("/api/v1", auth);
  app.use("/api/v1/product", product);
  app.use("/api/v1/ratings", ratings);
  app.get("/", (req: Request, res: Response) => {
    try {
      res.status(200).json({
        message: "default",
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
    }
  });
};
