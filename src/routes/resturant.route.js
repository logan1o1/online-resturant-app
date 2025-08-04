import e from "express"
import { addResturant } from "../controllers/hotels.controller.js";


const restRouter = e.Router();

restRouter.post('/create/:id', addResturant);

export default restRouter;
