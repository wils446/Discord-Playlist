import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { SongService } from "../../../components";
import { UnauthorizedError } from "../../../libs/errors";

type Params = { playlistId: string; songId: string };
type ReqBody = { position: number };

export const updateSongQueue: SuperRequestHandler<{ params: Params; reqBody: ReqBody }> = async (req, res, next) => {
	try {
		if (!req.user.id) throw new UnauthorizedError();

		const { playlistId, songId } = req.params;
		const { position } = req.body;

		const songService = new SongService();
		await songService.updateSongQueue(+playlistId, +songId, position);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
};
