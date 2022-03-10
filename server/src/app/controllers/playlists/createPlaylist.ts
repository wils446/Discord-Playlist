import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { PlaylistService } from "../../../components";

type ReqBody = { name: string };

export const createPlaylist: SuperRequestHandler<{ reqBody: ReqBody }> = async (req, res, next) => {
	try {
		const { name } = req.body;

		const playlistService = new PlaylistService();

		const newPlaylistId = await playlistService.createPlaylist(name, "" + req.user.id);

		res.status(200).json({ newPlaylistId });
	} catch (err) {
		next(err);
	}
};
