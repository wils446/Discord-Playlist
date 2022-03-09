import { RequestHandler } from "express";
import { AuthService, UserService } from "../../../components";

export const discordOAuth: RequestHandler = async (req, res, next) => {
	try {
		const { code } = req.query;

		const auth = new AuthService();
		const userService = new UserService();

		const accessToken = await auth.getAccessToken(code as string);
		const userDiscord = await auth.getUserInfo(accessToken.access_token);

		let user = await userService.getUserByDiscordId(userDiscord.id);
		if (!user) user = await userService.createUser(userDiscord);

		const jwtToken = await auth.generateJwtToken(user.id);
		res.status(200).send({ jwtToken });
	} catch (err) {
		next(err);
	}
};
