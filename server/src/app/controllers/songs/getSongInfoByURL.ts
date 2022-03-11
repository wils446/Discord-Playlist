import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { SongService } from "../../../components";

type Query = { URL: string };

export const getSongInfoByURL: SuperRequestHandler<{ query: Query }> = async (req, res, next) => {
	try {
		const { URL } = req.query;

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
