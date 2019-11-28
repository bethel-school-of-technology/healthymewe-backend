const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Environment Variables
require('dotenv').config();

// Express Server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
//const uri = process.env.ATLAS_URI;
const uri = "mongodb+srv://dbuser:Password1!@cluster0-auwtc.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Starts Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});