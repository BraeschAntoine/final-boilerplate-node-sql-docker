const BearerStrategy = require("passport-http-bearer").Strategy;
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const bearer = new BearerStrategy((token, done) => {
  let userRepository = getRepository(User);
  userRepository.findOne({ token }).then((user) => {
    if (!user) return done(null, false);
    return done(null, user, { scope: "all" });
  });
});
