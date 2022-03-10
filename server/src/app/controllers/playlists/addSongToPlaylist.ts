import { SuperRequestHandler } from "../../../@types/SuperRequestHandler";
import { PlaylistService, SongService } from "../../../components";
import { ICreateSongDTO } from "../../../components/songs/interface";

type Params = { playlistId: string };
type ReqBody = ICreateSongDTO;

export const addSongToPlaylist: SuperRequestHandler<{ params: Params; reqBody: ReqBody }> = async (req, res, next) => {
	try {
		const { playlistId } = req.params;
		const body = req.body;

		const playlistService = new PlaylistService();
		const songService = new SongService();

		const songId = await songService.addSong(body);
		await playlistService.addSongToPlaylist(+playlistId, songId);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
};
