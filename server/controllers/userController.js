const { Webhook } = require("svix");
const User = require("../models/user");

exports.clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { data, type } = req.body;
        switch (type) {
            case "user.created": {
                const newUser = await User.create({
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    profilePic: data.image_url
                })
                res.status(200).json({ success: true });
                break;
            }
            case "user.updated": {
                const updateUser = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    profilePic: data.image_url
                }
                await User.findOneAndUpdate({ clerkId: data.id }, updateUser);
                res.status(200).json({ success: true });
                break;
            }
            case "user.deleted": {
                await User.findOneAndDelete({ clerkId: data.id });
                res.status(200).json({ success: true })
                break;
            }

            default:
                break;
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}