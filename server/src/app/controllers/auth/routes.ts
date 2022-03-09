import { Router } from "express";
import { discordOAuth } from "./discordOAuth";

const routes = Router();

routes.get("/", discordOAuth);

export default routes;
