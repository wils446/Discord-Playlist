import Joi from "joi";
import { Model, Pojo, Validator, ValidatorArgs } from "objection";
import { ValidationError } from "../../libs/errors";
import { ISongHistory } from "./interface";

export default class SongHistory extends Model implements ISongHistory {
	public songId!: number;
	public discordId!: string;
	public timestamp!: Date;

	static get tableName(): string {
		return "song_history";
	}

	static createValidator(): Validator {
		return new SongHistoryValidator();
	}
}

class SongHistoryValidator extends Validator {
	validate(args: ValidatorArgs): Pojo {
		const data = args.json;

		const schema = Joi.object({
			songId: Joi.number().required(),
			discordId: Joi.string().required(),
			timestamp: Joi.date().required(),
		});
		const validate = schema.validate(data);
		if (validate.error) throw new ValidationError(validate.error.details[0].message);

		return data;
	}
}
