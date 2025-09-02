import express from 'express'
import { getDetails, signin, signup, update } from '../controllers/user.controller.js'


const userRouter = express.Router();


userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.patch('/update/:id', update);
userRouter.get('/acc_details/:id', getDetails)


export default userRouter;
