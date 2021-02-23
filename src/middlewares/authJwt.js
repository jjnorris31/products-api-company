import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader.split(" ").pop();
	if (token) {
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		const userFound = await User.findById(decoded.id, {password: 0});
		req.userId = userFound._id;
		if (req.userId) {
			next();
		} else {
			res.status(404).json('User not found.');
		}
	} else {
		res.status(403).json('No token provided');
	}
}

export const isModerator = async (req, res, next) => {
	const userId = req.userId;
	const user = await User.findById(userId, {password: 0}).populate('roles');
	if (user) {
		if (user.roles.find(role => role.name === 'moderator')) {
			next();
		} else {
			res.status(401).json('You are not an moderator.');
		}
	} else {
		res.status(401).json('You are not an moderator.');
	}
}

export const isAdmin = async (req, res, next) => {
	const userId = req.userId;
	const user = await User.findById(userId, {password: 0}).populate('roles');
	if (user) {
		if (user.roles.find(role => role.name === 'admin')) {
			next();
		} else {
			res.status(401).json('You are not an admin.');
		}
	} else {
		res.status(401).json('You are not an admin.');
	}
}
