export interface AccessTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
}

export interface UserRequestResponse {
	id: string;
	username: string;
	discriminator: string;
	avatar: string;
	verified: boolean;
	email: string;
	flags: number;
	banner: string;
	accent_color: number;
	premium_type: number;
	public_flags: number;
}
