import React from "react";
import { assets } from "../../../assets/assets";

const PriceCard = ({ plan }) => {
  return (
    <div className="bg-white drop-shadow-sm border rounded-lg py-10 px-8 text-gray-700 hover:scale-105 transition-all duration-500">
      <img src={assets.logo_icon} alt="logo_icon" width={40} />
      <p className="mt-3 font-semibold">{plan.id}</p>
      <p className="text-sm">{plan.desc}</p>
      <p className="mt-6">
        <span className="text-3xl font-medium">${plan.price}</span>/
        {plan.credits} credits
      </p>
      <button className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52">
        Purchase
      </button>
    </div>
  );
};

export default PriceCard;
