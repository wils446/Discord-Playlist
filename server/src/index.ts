import Express from "express";
import dotenv from "dotenv";

async function main() {
	dotenv.config({ path: ".env" });

	const app = Express();

	const { config } = await import("./core/config");
	await import("./core/db");

	app.listen(config.PORT, () => {
		console.log(`Server started on port ${config.PORT}`);
	});
}

main();
