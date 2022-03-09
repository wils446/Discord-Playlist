import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import User from "../components/users/UserModel";
import { config } from "./config";

const jwtOptions: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.JWT_SECRET,
};

passport.use(
	new JwtStrategy(jwtOptions, (jwtPayload, done) => {
		User.query()
			.findById(jwtPayload.id)
			.then((user) => {
				if (user) return done(null, user);
				else return done(null, false);
			})
			.catch((err) => done(err, false));
	})
);

export default passport;
