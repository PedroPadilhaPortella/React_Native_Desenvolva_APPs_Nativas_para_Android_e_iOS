const passportJwt = require("passport-jwt");
const passport = require("passport");

const { authSecret } = require("../.env.local");

const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, async (payload, done) => {
    try {
      const user = await app.db("users").where({ id: payload.id }).first();

      if (user) {
        done(null, { id: user.id, email: user.email });
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate("jwt", { session: false }),
  };
};
