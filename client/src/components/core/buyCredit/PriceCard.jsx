import React from "react";
import { assets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredit } from "../../../slices/creditSlice";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const PriceCard = ({ plan }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const loadCreditData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(baseURL + "/user/credits", {
        headers: { token },
      });
      if (data.success) {
        dispatch(setCredit(data.credits));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get credit points");
    }
  };

  const verifyPayment = async (response) => {
    const token = await getToken();
    try {
      const { data } = await axios.post(
        baseURL + "/payment/verify-payment",
        response,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Credits Added to your account");
        loadCreditData();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      image: assets.logo_icon,
      prefill: {
        name: user.fullName,
        email: user.emailAddresses[0],
      },
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        console.log(res);
        verifyPayment(res);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (planId) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }
      // load script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        toast.error(
          "Razorpay SDK failed to load. Check your Internet Connection."
        );
        return;
      }
      const token = await getToken();
      const { data } = await axios.post(
        baseURL + "/payment/capture-payment",
        { planId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-white drop-shadow-sm border rounded-lg py-10 px-8 text-gray-700 hover:scale-105 transition-all duration-500">
      <img src={assets.logo_icon} alt="logo_icon" width={40} />
      <p className="mt-3 font-semibold">{plan.id}</p>
      <p className="text-sm">{plan.desc}</p>
      <p className="mt-6">
        <span className="text-3xl font-medium">${plan.price}</span>/
        {plan.credits} credits
      </p>
      <button
        onClick={() => handleRazorpayPayment(plan.id)}
        className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
      >
        Purchase
      </button>
    </div>
  );
};

export default PriceCard;
