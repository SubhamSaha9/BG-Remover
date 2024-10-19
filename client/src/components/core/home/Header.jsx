import React from "react";
import { assets } from "../../../assets/assets";
import toast from "react-hot-toast";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import {
  setCredit,
  setImage,
  setResultImage,
} from "../../../slices/creditSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const { getToken } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeBG = async (image) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }

      dispatch(setImage(false));
      dispatch(setImage(image));
      dispatch(setResultImage(false));
      navigate("/result");

      const token = await getToken();
      const formData = new FormData();
      image && formData.append("image", image);
      const { data } = await axios.post(
        baseURL + "/image/remove-bg",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        dispatch(setResultImage(data.resultImage));
        data.creditBalance && dispatch(setCredit(data.creditBalance));
      } else {
        toast.error(data.message);
        data.creditBalance && dispatch(setCredit(data.creditBalance));
        if (data.creditBalance === 0) {
          navigate("/price");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove background!");
    }
  };

  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
      {/* left side */}
      <div className="">
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
          Remove the <br className="max-md:hidden" />{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            background
          </span>{" "}
          from <br className="max-md:hidden" />
          images for free.
        </h1>
        <p className="my-6 text-[15px] text-gray-500 font-medium">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. <br className="max-sm:hidden" /> Lorem Ipsum has been the
          industry's standard dummy text ever.
        </p>
        <div className="">
          <input
            onChange={(e) => removeBG(e.target.files[0])}
            type="file"
            id="upload1"
            hidden
            accept="image/*"
          />
          <label
            htmlFor="upload1"
            className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700"
          >
            <img src={assets.upload_btn_icon} alt="upload_btn" width={20} />
            <p className="text-white text-sm">Upload your image</p>
          </label>
        </div>
      </div>

      {/* right side */}
      <div className="w-full max-w-md">
        <img src={assets.header_img} alt="header_img" />
      </div>
    </div>
  );
};

export default Header;
