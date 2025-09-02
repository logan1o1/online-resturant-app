import express from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routes/user.route.js';
import cookieParser from 'cookie-parser';
import restRouter from './src/routes/resturant.route.js';
import foodRouter from './src/routes/food.route.js'


dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 4000

app.use('/api/auth', userRouter);
app.use("/api/resturant", restRouter);
app.use("/api/food", foodRouter);

app.listen(PORT, () => {
  console.log("server running on:", PORT);
})


app.use((err, req, resp, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return resp.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})
