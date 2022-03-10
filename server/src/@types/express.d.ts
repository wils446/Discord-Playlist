declare namespace Express {
	export interface Request {
		user: User;
	}

	export interface User {
		id: number;
		discordId: string;
		name: string;
		discriminator: string;
		avatarURL: string;
	}
}
