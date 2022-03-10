/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

type Props = {
	params?: any;
	resBody?: any;
	reqBody?: any;
	query?: any;
};

export type SuperRequestHandler<T extends Props = {}> = RequestHandler<
	T["params"] extends undefined ? ParamsDictionary : T["params"],
	T["resBody"] extends undefined ? any : T["resBody"],
	T["reqBody"] extends undefined ? any : T["reqBody"],
	T["query"] extends undefined ? ParsedQs : T["query"]
>;
