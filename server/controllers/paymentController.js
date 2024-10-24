const Transaction = require("../models/transaction");
const { instance } = require("../config/rajorpay");
const User = require("../models/user");


exports.capturePayment = async (req, res) => {
    try {
        const { clerkId, planId } = req.body;
        const user = await User.findOne({ clerkId });

        if (!user || !planId) {
            return res.status(200).json({
                success: false,
                message: "Invalid credentials!"
            })
        }

        let credits, plan, amount;
        switch (planId) {
            case 'Basic':
                plan = 'Baisc';
                credits = 100;
                amount = 10;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;
            case 'Business':
                plan = 'Business';
                credits = 5000;
                amount = 250;
                break;

            default:
                break;
        }

        const newTransaction = await Transaction.create({ clerkId, plan, amount, credits });

        const currency = "INR";
        const options = {
            amount: amount * 84 * 100,
            currency,
            receipt: newTransaction._id,
        }

        await instance.orders.create(options, (error, order) => {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
            res.status(200).json({
                success: true,
                message: "Order initeated successfully",
                order
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await instance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === "paid") {
            const transactionDetails = await Transaction.findById(orderInfo.receipt);
            if (transactionDetails.payment) {
                return res.status(200).json({
                    success: false,
                    message: "payment failed",
                });
            }

            // update credits
            const user = await User.findOne({ clerkId: transactionDetails.clerkId });
            const creditBalance = user.creditBalance + transactionDetails.credits;
            await User.findByIdAndUpdate(user._id, { creditBalance });

            // update payment status
            await Transaction.findByIdAndUpdate(transactionDetails._id, { payment: true });
            return res.status(200).json({
                success: true,
                message: "Payment Verified"
            });
        }

        res.status(200).json({
            success: false,
            message: "payment failed",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}