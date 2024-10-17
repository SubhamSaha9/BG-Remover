import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 lg:px-44 py-3">
      <img src={assets.logo} alt="logo" width={150} />
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright &copy;subham.io | All right reserved.
      </p>
      <div className="flex gap-1">
        <Link to={"https://www.facebook.com/subham.saha.16503323"} target="0">
          <img width={40} src={assets.facebook_icon} alt="facebook_icon" />
        </Link>
        <Link to={"https://github.com/SubhamSaha9"} target="0">
          <img width={40} src={assets.twitter_icon} alt="social_media" />
        </Link>
        <Link to={"mailto:myworkprofile200@gmail.com"}>
          <img width={40} src={assets.google_plus_icon} alt="social_media" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
