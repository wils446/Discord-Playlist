import Joi from "joi";
import { Model, Pojo, Validator, ValidatorArgs } from "objection";
import { ValidationError } from "../../libs/errors";
import { PlaylistModel } from "./interface";

export default class Playlist extends Model implements PlaylistModel {
	public id!: number;
	public name!: string;
	public createdBy!: string;
	public createdAt!: Date;

	static get tableName() {
		return "playlists";
	}

	static createValidator(): Validator {
		return new PlaylistValidator();
	}
}

class PlaylistValidator extends Validator {
	validate(args: ValidatorArgs): Pojo {
		const data = args.json;

		const schema = Joi.object({
			name: Joi.string().required(),
			createdBy: Joi.string().required(),
			createdAt: Joi.date().required(),
		});
		const validate = schema.validate(data);
		if (validate.error) throw new ValidationError(validate.error.details[0].message);

		return data;
	}
}
