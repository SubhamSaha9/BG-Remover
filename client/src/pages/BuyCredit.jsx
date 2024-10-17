import React from "react";
import { plans } from "../assets/assets";
import PriceCard from "../components/core/buyCredit/PriceCard";

const BuyCredit = () => {
  return (
    <div className="min-h-[76vh] text-center pt-14 mb-10">
      <button className="border border-gray-400 px-10 py-1 rounded-full mb-6">
        OUR PLANS
      </button>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-3 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-5 sm:mb-10">
        Choose the plan that's right for you
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((plan, i) => (
          <PriceCard plan={plan} key={i} />
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
