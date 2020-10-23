import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import * as passport from "passport";
import { local } from "./config/passport";
import { bearer } from "./config/bearer";

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();

    passport.use(local);
    passport.use(bearer);
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](route.route, [
        ...(route.hooks || []),
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        },
      ]);
    });

    // start express server
    app.listen(5000);

    console.log(
      "Express server has started on port 5000. Open http://localhost:5000/users to see results"
    );
  })
  .catch((error) => console.log(error));
