import { Router } from "express";
import passport from "../../../core/passport";
import { getUserById } from "./getUserById";

const routes = Router();

routes.get("/me", passport.authenticate("jwt", { session: false }), getUserById);

export default routes;
