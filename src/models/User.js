import {Schema, model} from 'mongoose';
import Role from '../models/Role';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	// relation
	roles: [{
		ref: Role,
		type: Schema.Types.ObjectId
	}]
},
	{
		timestamps: true,
	});

userSchema.statics.encryptPassword = async (password) => {
	// generating salt
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async (password, encryptedPassword) => {
	// comparing password and encrypted password
	return await bcrypt.compare(password, encryptedPassword);
}

export default model('User', userSchema);