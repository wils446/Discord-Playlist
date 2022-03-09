import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
	if (!err) {
		err = new Error("NotFoundError");
		err.name = "NotFoundError";
	}

	switch (err.name) {
		case "BadRequest":
			return res.status(400).json({ message: err.message });
		case "PermissionError":
			return res.status(403).json({ message: err.message });
		case "ValidationError":
			return res.status(422).json({ message: err.message });
		case "NotFoundError":
			return res.status(403).json({ message: err.message });
		case "UnauthorizedError":
			return res.status(401).json({ message: err.message });
		default:
			return res.status(500).json({ message: err.message });
	}
};
