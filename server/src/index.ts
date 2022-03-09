import Express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./app/middlewares";

async function main() {
	dotenv.config({ path: ".env" });

	const app = Express();
	app.use(Express.json());

	const { config } = await import("./core/config");
	await import("./core/db");

	app.use(errorHandler);

	app.listen(config.PORT, () => {
		console.log(`Server started on port ${config.PORT}`);
	});
}

main();
