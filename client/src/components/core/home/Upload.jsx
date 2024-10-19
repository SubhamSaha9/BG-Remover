import React from "react";
import { assets } from "../../../assets/assets";
import {
  setCredit,
  setImage,
  setResultImage,
} from "../../../slices/creditSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Upload = () => {
  const { openSignIn } = useClerk();
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();

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
    <div className="pb-16">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent p-6 md:py-16">
        See the magic. Try now
      </h1>
      <div className="text-center mb-24">
        <input
          onChange={(e) => removeBG(e.target.files[0])}
          type="file"
          id="upload2"
          hidden
          accept="image/*"
        />
        <label
          htmlFor="upload2"
          className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700"
        >
          <img src={assets.upload_btn_icon} alt="upload_btn" width={20} />
          <p className="text-white text-sm">Upload your image</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;
