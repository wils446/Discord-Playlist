import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { PlaylistService } from "../../../components";

export const getRandomPlaylists: SuperRequestHandler = async (req, res, next) => {
	try {
		const playlistService = new PlaylistService();

		const playlists = await playlistService.getPlaylists();

		res.status(200).send(playlists);
	} catch (err) {
		next(err);
	}
};
