import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { SongService } from "../../../components";

type ReqBody = { URL: string };

export const getSongInfoByURL: SuperRequestHandler<{ reqBody: ReqBody }> = async (req, res, next) => {
	try {
		const { URL } = req.body;

		const songService = new SongService();
		const song = await songService.getSongInfoByURL(URL);
		res.status(200).send({
			title: song.title,
			URL,
			thumbnail: song.thumbnails[0].url,
			duration: song.duration,
		});
	} catch (err) {
		next(err);
	}
};
