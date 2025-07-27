import bcryptjs from "bcryptjs";
import prisma from "../config/prismaClient";
import jwt from "jsonwebtoken";


// todo: username and email validation in database
// todo: passowrd omision in model
export async function signup(req, res, next) {
	const { name, username, email, password, role } = req.body;

	if (!name || !username || !email || !password) return res.status(400).json({ message: "Name, username, email, and password are required." });

	const existingUser = await prisma.user.findUnique(username);
	if (existingUser) return res.status(402).json({ message: "user already exists" });

	const hashPassword = bcryptjs.hashSync(password, 10);

	try {
		const newUser = await prisma.user.create({
			data: {
				name: name,
				username: username,
				email: email,
				password: hashPassword,
				role: role,
			}
		});
		const { password: _, ...userWithoutPassword } = newUser;

		res.status(201).json(userWithoutPassword);
	} catch (error) {
		if (error.code === 'P2002') return res.status(409).json({ message: `The ${error.meta.target.join(', ')} is already in use.` });
		next(error);
	}
}


export async function signin(req, res, next) {
	const { username, password, } = req.body;

	if (!username || !password) return res.status(400).json({ message: "username and password are required." });

	try {
		const user = await prisma.user.findUnique({ where: { username: username } });
		if (!user) return res.status(404).json({ message: "user not found" });

		const isValidPassword = bcryptjs.compareSync(password, user.password);
		if (!isValidPassword) return res.status(401).json({ message: "Wrong password" });

		const { password: _, ...userWithoutPassword } = user;

		const token = jwt.sign(
			{ id: user.id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		)

		res.status(200).json({ token: token, user: userWithoutPassword });
	} catch (error) {
		next(error)
	}
}


export async function signout(req, res, next) {

}
