import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { PlaylistService } from "../../../components";

type Query = { search?: string };

export const searchPlaylist: SuperRequestHandler<{ query: Query }> = async (req, res, next) => {
	try {
		const { search } = req.query;

		const playlistService = new PlaylistService();
		const playlists = await (search ? playlistService.searchPlaylist(search) : playlistService.getPlaylists());
		return res.status(200).json(playlists);
	} catch (err) {
		next(err);
	}
};
