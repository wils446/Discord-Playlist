import Express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./app/middlewares";

async function main() {
	dotenv.config({ path: ".env" });

	const app = Express();
	app.use(Express.json());

	const { config } = await import("./core/config");
	const { default: passport } = await import("./core/passport");
	const { authRoute, playlistRoute, songRoute, userRoute } = await import("./app/controllers");
	await import("./core/db");

	app.use(passport.initialize());

	app.use("/auth", authRoute);
	app.use("/playlists", playlistRoute);
	app.use("/songs", songRoute);
	app.use("/users", userRoute);

	app.use(errorHandler);

	app.listen(config.PORT, () => {
		console.log(`Server started on port ${config.PORT}`);
	});
}

main();
