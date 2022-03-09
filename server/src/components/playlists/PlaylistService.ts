import { NotFoundError } from "../../libs/errors";
import Playlist from "./PlaylistModel";

export default class PlaylistService {
	async getPlaylists(limit = 20): Promise<Playlist[]> {
		const playlists = await Playlist.query().limit(limit);

		return playlists;
	}

	async getPlaylist(playlistId: number): Promise<Playlist> {
		const playlist = await Playlist.query().findById(playlistId);

		if (!playlist) throw new NotFoundError("Playlist not found");

		return playlist;
	}

	async createPlaylist(title: string, id: string): Promise<number> {
		const playlist = await Playlist.query().insert({ name: title, createdBy: id, createdAt: new Date() });

		return playlist.id;
	}

	async deletePlaylist(playlistId: number): Promise<void> {
		const playlist = await Playlist.query().findById(playlistId);

		if (!playlist) throw new NotFoundError("Playlist not found");

		await Playlist.query().deleteById(playlistId);
	}

	async updatePlaylist(playlistId: number, title: string): Promise<void> {
		const playlist = await Playlist.query().findById(playlistId);

		if (!playlist) throw new NotFoundError("Playlist not found");

		await Playlist.query().patchAndFetchById(playlistId, {
			name: title,
			createdBy: playlist.createdBy,
			createdAt: playlist.createdAt,
		});
	}
}
