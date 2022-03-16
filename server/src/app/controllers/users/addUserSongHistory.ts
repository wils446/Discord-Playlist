import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { SongService } from "../../../components";
import SongHistoryService from "../../../components/songHistory/SongHistoryService";

type ReqBody = {
	discordId: string;
	title: string;
	URL: string;
	duration: number;
	thumbnailURL: string;
};

export const addUserSongHistory: SuperRequestHandler<{ reqBody: ReqBody }> = async (req, res, next) => {
	try {
		const { discordId, URL, duration, thumbnailURL, title } = req.body;

		const songService = new SongService();
		const songHistoryService = new SongHistoryService();

		const songId = await songService.addSong({ title, thumbnailURL, URL, duration });
		await songHistoryService.addSongHistory({ discordId, songId, timestamp: new Date() });
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};
