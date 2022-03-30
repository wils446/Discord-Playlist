import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import SongHistoryService from "../../../components/songHistory/SongHistoryService";

type ReqBody = {
	discordId: string;
};

export const getSongHistorySorted: SuperRequestHandler<{ reqBody: ReqBody }> = async (req, res, next) => {
	try {
		const { discordId } = req.body;

		const songHistoryService = new SongHistoryService();
		const songHistory = await songHistoryService.getSongHistory(discordId);

		res.send(songHistory);
	} catch (err) {
		next(err);
	}
};
