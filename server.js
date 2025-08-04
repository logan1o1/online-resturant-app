import express from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routes/user.route.js';


dotenv.config()
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4000

app.use('/api/auth', userRouter);


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
