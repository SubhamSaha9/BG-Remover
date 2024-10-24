require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const database = require("./config/database");

const userRoutes = require("./routes/user");
const imageRoutes = require("./routes/image");
const paymentRoutes = require("./routes/payment");

// connect database
database.connect();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
})

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/image", imageRoutes);

app.listen(port, () => {
    console.log(`app is listening to port ${port}`);
})