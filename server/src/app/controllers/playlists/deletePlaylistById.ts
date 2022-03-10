import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { PlaylistService } from "../../../components";

type Params = { playlistId: string };

export const deletePlaylistById: SuperRequestHandler<{ params: Params }> = async (req, res, next) => {
	try {
		const { playlistId } = req.params;

		const playlistService = new PlaylistService();

		await playlistService.deletePlaylist(+playlistId);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
};
