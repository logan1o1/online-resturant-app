import prisma from "../config/prismaClient.js";
import { geocodeAddr } from "../middlewares/geocode.js";


export async function addResturant(req, res, next) {
	const id = req.params.id;
	const { name, location } = req.body;
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) return res.status(404).json({ message: "user doesn't exists" });

		if (user.role != "merchant") return res.status(401).json({ message: "Only merchant is alowed to add a resturant" });

		const formatted = await geocodeAddr(location);
		const resturant = await prisma.resturant.create({
			data: {
				name: name,
				location: formatted,
				owner: { connect: { id } }
			}
		})
		res.status(201).json(resturant);
	} catch (error) {
		next(error);
	}
} 
