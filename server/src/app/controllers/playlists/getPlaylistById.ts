import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { PlaylistService, SongService } from "../../../components";

type Params = { playlistId: string };

export const getPlaylistById: SuperRequestHandler<{ params: Params }> = async (req, res, next) => {
	try {
		const { playlistId } = req.params;

		const playlistService = new PlaylistService();
		const songService = new SongService();

		const playlist = await playlistService.getPlaylist(+playlistId);
		const songs = await songService.getSongFromPlaylist(+playlistId);

		res.status(200).send({
			name: playlist.name,
			createdAt: playlist.createdAt,
			createdBy: playlist.createdBy,
			permission: req.user.id === +playlist.createdBy ? true : false,
			songs,
		});
	} catch (err) {
		next(err);
	}
};
