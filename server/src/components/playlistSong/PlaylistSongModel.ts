import Joi from "joi";
import { Model, Pojo, Validator, ValidatorArgs } from "objection";
import { ValidationError } from "../../libs/errors";
import { playlistSongModel } from "./interface";

export default class PlaylistSong extends Model implements playlistSongModel {
	public playlistId!: number;
	public songId!: number;
	public queueNumber!: number;

	static get tableName() {
		return "playlist_song";
	}

	static createValidator(): Validator {
		return new PlaylistSongValidator();
	}
}

class PlaylistSongValidator extends Validator {
	validate(args: ValidatorArgs): Pojo {
		const data = args.json;

		const schema = Joi.object({
			playlistId: Joi.number().required(),
			songId: Joi.number().required(),
			queueNumber: Joi.number().required(),
		});
		const validate = schema.validate(data);
		if (validate.error) throw new ValidationError(validate.error.details[0].message);

		return data;
	}
}
