import express, { Application } from "express";
import cors from "cors";
import { MainApp } from "./mainApp";
import { mainConnection } from "./dbConfig";

const port: number | string = process.env.PORT || 5040;

const app: Application = express();

app.use(cors());
app.use(express.json());
MainApp(app);
mainConnection();

const server = app.listen(port, () => {
  console.log(`server is up and running on ${port} `);
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection"), reason;

  server.close(() => {
    process.exit(1);
  });
});
