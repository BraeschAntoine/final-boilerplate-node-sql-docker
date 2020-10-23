import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as passport from "passport";
import { uid } from "rand-token";
import { LocalStrategy } from "passport-local";
import { runInThisContext } from "vm";

export class UserController {
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }

  async login(request: Request, response: Response, next: NextFunction) {
    passport.authenticate(
      "local",
      {
        session: false,
      },
      (err, user, info) => {
        if (err) return response.json(err);
        if (!user) return response.json(info.message);
        let token = uid(16);
        this.userRepository.update(user.id, { token }).then(() => {
          response.json({ token: token });
        });
      }
    )(request, response, next);
  }

  async logout(request: Request, response: Response, next: NextFunction) {
    const token = request.header("Authorization").replace("Bearer ", "");
    this.userRepository.update({ token }, { token: "" }).then(() => {
      request.logout();
      response.json({ msg: "User logged out", success: true });
    });
  }
}
