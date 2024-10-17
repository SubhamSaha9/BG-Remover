import React from "react";
import Header from "../components/core/home/Header";
import Steps from "../components/core/home/Steps";
import BgSlider from "../components/core/home/BgSlider";
import Testimonials from "../components/core/home/Testimonials";
import Upload from "../components/core/home/Upload";

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <BgSlider />
      <Testimonials />
      <Upload />
    </div>
  );
};

export default Home;
