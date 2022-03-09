import { UserRequestResponse } from "../auth/interface";
import User from "./UserModel";

export default class UserService {
	async createUser(user: UserRequestResponse): Promise<number> {
		const newUser = await User.query().insert({
			name: user.username,
			discordId: user.id,
			discriminator: user.discriminator,
			avatarURL: user.avatar,
		});

		return newUser.id;
	}

	async getUserById(id: number): Promise<User | undefined> {
		const user = await User.query().findById(id);

		return user;
	}

	async getUserByDiscordId(discordId: string): Promise<User | undefined> {
		const user = await User.query().findOne({ discordId });

		return user;
	}
}
