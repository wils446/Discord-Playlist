import { Router } from "express";
import passport from "../../../core/passport";
import { searchPlaylist } from "./searchPlaylist";
import { addSongToPlaylist } from "./addSongToPlaylist";
import { createPlaylist } from "./createPlaylist";
import { deletePlaylistById } from "./deletePlaylistById";
import { getPlaylistById } from "./getPlaylistById";
import { removeSongFromPlaylist } from "./removeSongFromPlaylist";
import { updateSongQueue } from "./updateSongQueue";

const routes = Router();

routes.get("/", passport.authenticate("jwt", { session: false }), searchPlaylist);
routes.post("/", passport.authenticate("jwt", { session: false }), createPlaylist);
routes.get("/:playlistId", passport.authenticate("jwt", { session: false }), getPlaylistById);
routes.delete("/:playlistId", passport.authenticate("jwt", { session: false }), deletePlaylistById);
routes.post("/:playlistId/song", passport.authenticate("jwt", { session: false }), addSongToPlaylist);
routes.delete("/:playlistId/song/:songId", passport.authenticate("jwt", { session: false }), removeSongFromPlaylist);
routes.put("/:playlistId/song/:songId/queue", passport.authenticate("jwt", { session: false }), updateSongQueue);

export default routes;
