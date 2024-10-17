require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const database = require("./config/database");

// connect database
database.connect();

app.use(express.json());
app.use(
    cors()
);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
})

app.listen(port, () => {
    console.log(`app is listening to port ${port}`);
})