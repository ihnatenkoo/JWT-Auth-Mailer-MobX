require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./src/router');
const errorMiddleware = require('./src/middlewares/error.middleware');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/auth', authRouter);
app.use(errorMiddleware);

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL);
		app.listen(PORT, () => console.log(`Server was started on port ${PORT}`));
	} catch (error) {
		console.log(error);
	}
};

start();
