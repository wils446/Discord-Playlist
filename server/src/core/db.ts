import { Model } from "objection";
import knex from "knex";
import { config } from "./config";

const db = knex<any, Record<string, any>[]>({
	client: "mysql2",
	connection: {
		host: config.MYSQL_HOST,
		user: config.MYSQL_USER,
		password: config.MYSQL_PASSWORD,
		database: config.MYSQL_DATABASE,
		port: config.MYSQL_PORT,
	},
});

Model.knex(db);

export default db;
