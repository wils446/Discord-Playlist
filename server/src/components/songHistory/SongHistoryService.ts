import { ISongHistory } from "./interface";
import SongHistory from "./SongHistoryModel";

export default class SongHistoryService {
	async addSongHistory({ discordId, songId, timestamp }: ISongHistory) {
		await SongHistory.query().insert({ discordId, songId, timestamp });
	}

	async getSongHistory(discordId: string) {
		const songHistory = await SongHistory.query().select().where({ discordId });

		const data: Record<string, number> = {};
		songHistory.forEach((song) => {
			data[song.songId] = (data[song.songId] || 0) + 1;
		});

		const dataSortable = Object.entries(data).sort(([, a], [, b]) => b - a);

		const songHistorySorted = dataSortable.map(([songId, count]) => {
			const song = songHistory.find((song) => song.songId === +songId);
			return {
				...song,
				count: count,
			};
		});

		return songHistorySorted;
	}
}
