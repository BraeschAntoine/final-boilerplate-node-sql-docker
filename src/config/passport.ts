const LocalStrategy = require("passport-local").Strategy;
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";

export const local = new LocalStrategy((username, password, done) => {
  let userRepository = getRepository(User);
  // Match user
  userRepository
    .findOne({
      username,
    })
    .then((user) => {
      if (!user) {
        return done(null, false, {
          message: "That email is not registered",
        });
      }

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) console.log(err);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      });
    })
    .catch(console.log);
});
