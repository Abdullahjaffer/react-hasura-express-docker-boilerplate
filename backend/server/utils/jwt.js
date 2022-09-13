import jwt from "jsonwebtoken";
import { getUserById } from "../services/user.js";

const JWT_SECRET = {
	type: process.env.JWT_SECRET_TYPE || "HS256",
	key:
		process.env.JWT_SECRET_KEY ||
		"this-is-a-generic-HS256-secret-key-and-you-should-really-change-it",
};

const JWT_CONFIG = {
	algorithm: JWT_SECRET.type,
	// uses seconds
	expiresIn: 60 * 60 * 24,
};

// function assumes user exists
export async function generateJWT(userId) {
	const { role, name, email, id } = await getUserById(userId);
	const payload = {
		user: {
			role,
			name,
			email,
			id,
		},
	};
	return jwt.sign(payload, JWT_SECRET.key, JWT_CONFIG);
}

export function verifyToken(token) {
	return jwt.verify(token, JWT_SECRET.key, JWT_CONFIG);
}
