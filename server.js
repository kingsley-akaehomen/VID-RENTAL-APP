const express = require('express');
const morgan = require ('morgan')
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection.js');
const errorHandler = require('./middleware/errorHandler.js');

connectDb();
const app = express();

const PORT = process.env.PORT || 6000;

//Application middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1", require("./routes/customerRoute"));
app.use("/api/v1", require("./routes/moviesRoute"));
app.use("/api/v1", require("./routes/genresRoute"));
app.use("/api/v1", require("./routes/rentalsRoute"));
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});