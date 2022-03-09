import Joi from "joi";
import { Model, Pojo, Validator, ValidatorArgs } from "objection";
import { ValidationError } from "../../libs/errors";
import { SongModel } from "./interface";

export default class Song extends Model implements SongModel {
	public id!: number;
	public URL!: string;
	public title!: string;
	public duration!: number;
	public thumbnailURL!: string;

	static get tableName() {
		return "songs";
	}

	static createValidator(): Validator {
		return new SongValidator();
	}
}

class SongValidator extends Validator {
	validate(args: ValidatorArgs): Pojo {
		const data = args.json;

		const schema = Joi.object({
			URL: Joi.string().required(),
			title: Joi.string().required(),
			duration: Joi.number().required(),
			thumbnailURL: Joi.string().required(),
		});
		const validate = schema.validate(data);
		if (validate.error) throw new ValidationError(validate.error.details[0].message);

		return data;
	}
}
