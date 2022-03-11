import { Router } from "express";
import passport from "../../../core/passport";
import { getSongInfoByURL } from "./getSongInfoByURL";

const routes = Router();

routes.get("/", passport.authenticate("jwt", { session: false }), getSongInfoByURL);

export default routes;
