import { NotFoundError } from "../../libs/errors";
import PlaylistSong from "../playlistSong/PlaylistSongModel";
import { Client, Video } from "youtubei";
import { ICreateSongDTO } from "./interface";
import Song from "./SongModel";

export default class SongService {
	private youtubeiClient = new Client();

	async getSongById(songId: number): Promise<Song> {
		const song = await Song.query().findById(songId);

		if (!song) throw new NotFoundError("Song not found");

		return song;
	}

	async getSongFromPlaylist(playlistId: number): Promise<Song[]> {
		const playlistSongs = await PlaylistSong.query().select().where({ playlistId }).orderBy("queueNumber");

		if (!playlistSongs) throw new NotFoundError("Song not found");

		const songs = await Promise.all([...playlistSongs.map(({ songId }) => Song.query().findById(songId))]);

		return (songs as Song[]) || [];
	}

	async addSong(songData: ICreateSongDTO): Promise<number> {
		let song = await Song.query().findOne({ title: songData.title, URL: songData.URL });
		if (!song) song = await Song.query().insert(songData);

		return song.id;
	}

	//if queue is undefined, it will be the last song in the queue
	async updateSongQueue(playlistId: number, songId: number, queue?: number) {
		if (queue === 0) return;

		if (!queue) {
			const playlistSongs = await this.getSongFromPlaylist(playlistId);
			queue = playlistSongs.length;
		}

		const song = await PlaylistSong.query().select().where({ songId, playlistId }).first();

		if (!song) throw new NotFoundError("Song not found");

		const songs = await PlaylistSong.query()
			.select()
			.where({ playlistId })
			.where("queueNumber", song.queueNumber > queue ? ">=" : "<=", queue)
			.where("queueNumber", song.queueNumber > queue ? "<" : ">", song.queueNumber);

		await Promise.all([
			...songs.map(({ songId, queueNumber, playlistId }) =>
				PlaylistSong.query()
					.patch({
						songId,
						playlistId,
						queueNumber: song.queueNumber > queue! ? queueNumber + 1 : queueNumber - 1,
					})
					.where({ songId, playlistId })
			),
		]);

		await PlaylistSong.query()
			.patch({ songId: song.songId, playlistId: song.playlistId, queueNumber: queue })
			.where({ songId, playlistId });
	}

	async getSongInfoByURL(URL: string): Promise<Video> {
		const songInfo = await this.youtubeiClient.getVideo<Video>(URL);

		if (!songInfo) throw new NotFoundError("Song not found");

		return songInfo;
	}
}
