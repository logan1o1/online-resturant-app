import express from 'express'
import { signin, signup, update } from '../controllers/user.controller.js'


const userRouter = express.Router();


userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.patch('/update/:id', update);



export default userRouter;
