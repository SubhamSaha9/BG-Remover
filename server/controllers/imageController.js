const axios = require("axios");
const fs = require("fs");
const User = require("../models/user");
const FormData = require("form-data");

exports.removeBgImage = async (req, res) => {
    try {
        const { clerkId } = req.body;
        const user = await User.findOne({ clerkId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.creditBalance === 0) {
            return res.status(200).json({
                success: false,
                message: "insufficient credit balance",
                creditBalance: user.creditBalance
            });
        }

        const imagePath = req.file.path;
        const imageFile = fs.createReadStream(imagePath);
        const formData = new FormData();
        formData.append("image_file", imageFile);

        const { data } = await axios.post("https://clipdrop-api.co/remove-background/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType: "arraybuffer"
        });

        const base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:${req.file.mimetype};base64, ${base64Image}`;
        await User.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

        res.status(200).json({
            success: true,
            message: "Background removed successfully",
            resultImage,
            creditBalance: user.creditBalance - 1,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}