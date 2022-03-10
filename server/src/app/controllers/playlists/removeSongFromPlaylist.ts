import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { PlaylistService, SongService } from "../../../components";

type Params = { playlistId: string; songId: string };

export const removeSongFromPlaylist: SuperRequestHandler<{ params: Params }> = async (req, res, next) => {
	try {
		const { playlistId, songId } = req.params;

		const playlistService = new PlaylistService();
		const songService = new SongService();

		await songService.updateSongQueue(+playlistId, +songId);
		await playlistService.removeSongFromPlaylist(+playlistId, +songId);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
};
