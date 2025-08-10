import e from "express"
import { addResturant, getRest, updateRest } from "../controllers/hotels.controller.js";


const restRouter = e.Router();

restRouter.post('/create/:id', addResturant);
restRouter.get('/get', getRest);
restRouter.patch('/update/:id', updateRest);

export default restRouter
