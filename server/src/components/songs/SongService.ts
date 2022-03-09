import { NotFoundError } from "../../libs/errors";
import PlaylistSong from "../playlistSong/PlaylistSongModel";
import { ICreateSongDTO } from "./interface";
import Song from "./SongModel";

export default class SongService {
	async getSongById(songId: number): Promise<Song> {
		const song = await Song.query().findById(songId);

		if (!song) throw new NotFoundError("Song not found");

		return song;
	}

	async getSongFromPlaylist(playlistId: number): Promise<Song[]> {
		const song = await Song.query().select().where({ playlistId });

		if (!song) throw new NotFoundError("Song not found");

		return song;
	}

	async addSong(songData: ICreateSongDTO): Promise<number> {
		let song = await Song.query().where({ URL: songData.URL, title: songData.title }).first();
		if (!song) song = await Song.query().insert(songData);

		return song.id;
	}

	async updateSongQueue(playlistId: number, songId: number, queue: number) {
		const song = await PlaylistSong.query().select().where({ songId, playlistId }).first();

		if (!song) throw new NotFoundError("Song not found");

		const songs = await PlaylistSong.query()
			.select()
			.where({ playlistId })
			.where("queueNumber", ">=", queue)
			.where("queueNumber", "<", song.queueNumber);

		await Promise.all([
			...songs.map(({ songId, queueNumber, playlistId }) => {
				PlaylistSong.query()
					.patch({ songId, playlistId, queueNumber: queueNumber + 1 })
					.where({ songId, playlistId });
			}),
		]);

		await PlaylistSong.query()
			.patch({ songId: song.songId, playlistId: song.playlistId, queueNumber: queue })
			.where({ songId, playlistId });
	}
}
