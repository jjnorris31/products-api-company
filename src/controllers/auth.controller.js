import User from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Role from '../models/Role';

dotenv.config();

export const signUp = async (req, res) => {
	const { username, email, password, roles } = req.body;
	const newUser = new User(
		{
			username: username,
			email: email,
			password: await User.encryptPassword(password),
		});

	if (roles) {
		// getting all roles
		const foundRoles = await Role.find({name: {$in: roles}});
		newUser.roles = foundRoles.map(role => role._id);
	} else {
		const userRole = await Role.findOne({name: 'user'});
		newUser.roles = [userRole._id];
	}

	try {
		const savedUser = await newUser.save();
		// creating token
		const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET, {expiresIn: 86400});
		res.status(201).json(token);
	} catch (e) {
		switch (e.code) {
			case 11000:
				res.status(409).send('Duplicated username or email.');
				break;
			default:
				res.status(500).json(e);
		}
	}
}

export const logIn = async (req, res) => {
	const {email, password} = req.body;
	try {
		const loggedUser = await User.findOne({email}).populate('roles');
		if (loggedUser) {
			if (await User.comparePassword(password, loggedUser.password)) {
				const token = jwt.sign({id: loggedUser._id}, process.env.JWT_SECRET, {expiresIn: 86400})
				res.status(200).json(token);
			} else {
				res.status(404).json('The password does not match.');
			}
		} else {
			res.status(404).json('The user does not exist.');
		}

	} catch (e) {
		res.status(500).json(e);
	}
}