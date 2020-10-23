import { bearer } from "./config/bearer";
import { PhotoController } from "./controller/PhotoController";
import { UserController } from "./controller/UserController";
import * as passport from "passport";
import { User } from "./entity/User";

const strat = passport.authenticate("bearer", { session: false });
export const Routes = [
  // Photos routes
  {
    method: "get",
    route: "/photos",
    controller: PhotoController,
    action: "all",
    hooks: [strat],
  },
  {
    method: "get",
    route: "/photo/:id",
    controller: PhotoController,
    action: "one",
    hooks: [strat],
  },
  {
    method: "post",
    route: "/photo",
    controller: PhotoController,
    action: "save",
    hooks: [strat],
  },
  {
    method: "delete",
    route: "/photo/:id",
    controller: PhotoController,
    action: "remove",
    hooks: [strat],
  },
  // User routes
  {
    method: "get",
    route: "/api/user",
    controller: UserController,
    action: "all",
    hooks: [strat],
  },
  {
    method: "get",
    route: "/user/:id",
    controller: UserController,
    action: "one",
    hooks: [strat],
  },
  {
    method: "post",
    route: "/user",
    controller: UserController,
    action: "save",
    hooks: [strat],
  },
  {
    method: "delete",
    route: "/user/:id",
    controller: UserController,
    action: "remove",
    hooks: [strat],
  },
  {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login",
  },
  {
    method: "get",
    route: "/logout",
    controller: UserController,
    action: "logout",
  },
];
