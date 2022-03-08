export const config = {
	PORT: process.env.PORT || 3000,

	JWT_SECRET: process.env.JWT_SECRET as string,

	MYSQL_HOST: process.env.MYSQL_HOST as string,
	MYSQL_USER: process.env.MYSQL_USER as string,
	MYSQL_PASSWORD: process.env.MYSQL_PASSWORD as string,
	MYSQL_DATABASE: process.env.MYSQL_DATABASE as string,
	MYSQL_PORT: +process.env.MYSQL_PORT! as number,

	DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
	DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET as string,
};
