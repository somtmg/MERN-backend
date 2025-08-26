const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./connect/database');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

connectDB();

// using JSON(middleware) NOTE: middleware always comes befor routes
app.use(express.json());
app.use(express.urlencoded(({ extended: false })))

// connecting to the routes
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// using errorHandler defined in middleware
app.use(errorHandler);

// connecting to the port
app.listen(port, () => console.log(`Server listening on ${port}`))