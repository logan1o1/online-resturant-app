import e from "express"
import { createFood, getFoodItem, updateFoodItem } from "../controllers/food.controller.js";


const foodRouter = e.Router();

foodRouter.post("/create_food/:id", createFood);
foodRouter.get("/getfood", getFoodItem);
foodRouter.patch("/update/food/:id", updateFoodItem)


export default foodRouter; 
