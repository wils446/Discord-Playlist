import axios from "axios";
import jwt from "jsonwebtoken";
import { AccessTokenResponse, UserRequestResponse } from "./interface";

export default class AuthService {
	private discordClientId = process.env.DISCORD_CLIENT_ID as string;
	private discordClientSecret = process.env.DISCORD_CLIENT_SECRET as string;
	private axios = axios.create({
		baseURL: "https://discordapp.com/api/v9",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});

	async getAccessToken(code: string): Promise<AccessTokenResponse> {
		const body = new URLSearchParams({
			client_id: this.discordClientId,
			client_secret: this.discordClientSecret,
			code: code,
			grant_type: "authorization_code",
			redirect_uri: "http://localhost:3000/auth",
			scope: "identify",
		});

		const response = await this.axios.post("/oauth2/token", body);

		return response.data;
	}

	async getUserInfo(accessToken: string): Promise<UserRequestResponse> {
		const response = await this.axios.get("/users/@me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response.data;
	}

	async generateJwtToken(userId: number): Promise<string> {
		const jwtToken = await jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: "1y" });

		return jwtToken;
	}
}
