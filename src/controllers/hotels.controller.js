import prisma from "../config/prismaClient.js";
import { geocodeAddr } from "../middlewares/geocode.js";


export async function addResturant(req, res, next) {
  const id = req.params.id;
  const { name, location } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ message: "user doesn't exists" });

    if (user.role != "merchant") return res.status(401).json({ message: "only merchant is alowed to add a resturant" });

    const formatted = await geocodeAddr(location);
    if (!formatted) {
      res.status(401).json({ message: "not able to get formatted address" })
    }

    const resturant = await prisma.resturant.create({
      data: {
        name: name,
        location: formatted,
        owner: { connect: { id } }
      }
    })
    if (!resturant) {
      res.status(402).json({ message: "unnable to create resturant" })
    }

    res.status(201).json(resturant);
  } catch (error) {
    next(error);
  }
}

export async function getRest(req, res, next) {
  try {
    const resturants = await prisma.resturant.findMany()
    if (!resturants) {
      res.status(404).json({ message: "no resturant found" })
    }

    res.status(200).json(resturants)
  } catch (error) {
    next(error)
  }
}

export async function updateRest(req, res, next) {
  const id = req.params.id
  const { name, location } = req.body

  try {
    const resturant = await prisma.findUnique({ where: { id } })
    if (!resturant) {
      res.status(404).json({ message: "The said resturant doesn't exist" })
    }

    const formatted = await geocodeAddr(location);
    if (!formatted) {
      res.status(401).json({ message: "not able to get formatted address" })
    }
    const updatedRest = await prisma.resturant.update({
      where: { id },
      data: {
        name: name,
        location: formatted,
      }
    })
    if (!resturant) {
      res.status(402).json({ message: "unnable to create resturant" })
    }

    res.status(201).json(updatedRest)
  } catch (error) {
    next(error)
  }
}


