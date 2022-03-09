import Joi from "joi";
import { Model, Pojo, Validator, ValidatorArgs } from "objection";
import { ValidationError } from "../../libs/errors";
import { UserModel } from "./interface";

export default class User extends Model implements UserModel {
	public id!: number;
	public name!: string;
	public discordId!: string;
	public discriminator!: string;
	public avatarURL!: string;

	static get tableName() {
		return "users";
	}

	static createValidator(): Validator {
		return new UserValidator();
	}
}

class UserValidator extends Validator {
	public validate(args: ValidatorArgs): Pojo {
		const data = args.json;

		const schema = Joi.object({
			name: Joi.string().required(),
			discordId: Joi.string().required(),
			discriminator: Joi.string().required(),
			avatarURL: Joi.string().required(),
		});
		const validate = schema.validate(data);
		if (validate.error) throw new ValidationError(validate.error.details[0].message);

		return data;
	}
}
