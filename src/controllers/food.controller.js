import prisma from "../config/prismaClient.js";

export async function createFood(req, res, next) {
  const { name, price, ingredients } = req.body;
  const restId = req.params.id;

  if (!name, !price, !ingredients) {
    return res.status(405).json({ message: "you must fill all the parameters" })
  }

  // const ingredientsStr = ingredients.join(', ');

  try {
    const resturant = await prisma.resturant.findUnique({ where: { id: restId } })
    if (!resturant) {
      return res.status(404).json({ message: "The resturant doesn't exist'" })
    }

    const foodItem = await prisma.food.create({
      data: {
        name: name,
        price: price,
        ingredients: ingredients,
        hotel: { connect: { id: restId } }
      }
    })
    if (!foodItem) {
      return res.status(400).json({ message: "Unable to create food item" })
    }

    res.status(201).json(foodItem)
  } catch (error) {
    next(error)
  }
}

export async function getFoodItem(req, res, next) {
  try {
    const foodItems = await prisma.food.findMany()
    if (!foodItems) {
      return res.status(403).json({ message: "No food items exist" })
    }

    res.status(200).json(foodItems)
  } catch (error) {
    next(error)
  }
}

export async function updateFoodItem(req, res, next) {
  const id = req.params.id;
  const { name, price, ingredients } = req.body;

  try {
    const foodItem = await prisma.food.findUnique({ where: { id } })
    if (!foodItem) {
      return res.status(404).json({ message: "The food doesn't exist" })
    }

    const updatedFoodItem = await prisma.food.update({
      where: { id },
      data: {
        name: name,
        price: price,
        ingredients: ingredients,
      }
    })

    res.status(201).json(updatedFoodItem)
  } catch (error) {
    next(error)
  }
}
