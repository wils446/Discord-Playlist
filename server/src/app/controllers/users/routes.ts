import { Router } from "express";
import passport from "../../../core/passport";
import { getUserById } from "./getUserById";
import { getSongHistorySorted } from "./getSongHistorySorted";
import { addUserSongHistory } from "./addUserSongHistory";

const routes = Router();

routes.get("/me", passport.authenticate("jwt", { session: false }), getUserById);
routes.get("/me/songs/history", getSongHistorySorted);
routes.post("/me/songs/history", addUserSongHistory);

export default routes;
