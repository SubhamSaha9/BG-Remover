import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAuth, useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { setCredit } from "../../slices/creditSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCreditData = async () => {
      try {
        const token = await getToken();
        const { data } = axios.get(baseURL + "/user/credits", {
          Headers: { token },
        });
        if (data.success) {
          dispatch(setCredit(data.credits));
          console.log(data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to get credit points");
      }
    };
    if (isSignedIn) {
      loadCreditData();
    }
  }, [isSignedIn]);
  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      <Link to={"/"}>
        <img className="w-32 sm:w-44" src={assets.logo} alt="logo" />
      </Link>
      {isSignedIn ? (
        <div>
          <UserButton />
        </div>
      ) : (
        <button
          className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full"
          onClick={() => openSignIn({})}
        >
          Get started{" "}
          <img src={assets.arrow_icon} alt="btn" className="w-3 sm:w-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
