/* eslint-disable indent */
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import sequelize from "./config/database";
import migrate from "./config/migrate";
import { Request, Response } from "express";
import redis from "./utility/redis";
import utility from "./utility/utility";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import multer from "multer";
import http from "http";

class App {
  public express;
  public swaggerDocument;
  public storage;
  constructor() {
    this.express = express();
    this.swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml"));
    this.storage = multer.diskStorage({
      destination: async (req, file, cb) => {
        cb(null, "src/Images");
      },
      filename: async (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });
    this.init();
  }

  async init() {
    try {
      await this.initDatabase();
      this.middleware();
      this.addRoutes();
      this.errorHandler();
    } catch (error) {
      console.log("init error - ", error);
    }
  }

  async initDatabase() {
    try {
      await sequelize.authenticate();
      await migrate.syncModels();
      // await redis.client.connect();
    } catch (error) {
      console.log("initDatabase error - ", error);
    }
  }

  middleware(): void {
    try {
      this.express.use(
        cors({
          origin: process.env.WEB_URL,
        })
      );
      this.express.use(morgan("dev"));
      this.express.use(express.json());
      this.express.use(express.urlencoded({ extended: true }));
      this.express.use(helmet());
      this.express.use(utility.verifyToken);
      this.express.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(this.swaggerDocument)
      );
      this.express.use(
        "/Images",
        express.static(path.join(__dirname, "Images"))
      );
      this.express.use(multer({ storage: this.storage }).single("image"));
    } catch (error) {
      console.log("middleware error - ", error);
    }
  }


  addRoutes(): void {
    try {
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        this.express.use("/", route);
      }
    } catch (error) {
      console.log("addRoutes error - ", error);
    }
  }

  errorHandler(): void {
    try {
      this.express.get("/redis", async (req: Request, res: Response) => {
        try {
          const result = await redis.options();
          utility.successRes(res, 200, result);
        } catch (error) {
          utility.errorRes(res, 404, error);
        }
      });
      this.express.use((req: Request, res: Response) => {
        utility.errorRes(res, 404, null, "Not Found");
      });
    } catch (error) {
      console.log("errorHandler error - ", error);
    }
  }
}

export default new App().express;
