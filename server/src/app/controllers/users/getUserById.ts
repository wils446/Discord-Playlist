import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { UserService } from "../../../components";

export const getUserById: SuperRequestHandler = async (req, res, next) => {
	try {
		const userService = new UserService();
		const user = await userService.getUserById(req.user.id);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};
