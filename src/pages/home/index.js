import React from "react";
// import {  } from "react-bootstrap";
import "./home-content.scss";
// import HomeBanner from "./HomeBanner";
import NewHomeBanner from "./NewHomeBanner";
import HomeAboutUs from "./HomeAboutUs";
import HomeProductFeature from "./HomeProductFeature";
import HomeCustomization from "./HomeCustomization";
import HomeProduct from "./HomeProduct";
import HomeSocial from "./HomeSocial";
import HomeGame from "./HomeGame";

const Home = () => {
  return (
    <>
      <div className="home-content mb-5">
          <NewHomeBanner/>
          {/* <HomeBanner/> */}
          <HomeAboutUs/>
          <HomeProductFeature/>
          <HomeCustomization/>
          <HomeProduct/>
          <HomeSocial/>
          <HomeGame/>
      </div> 
    </>
  );
};

export default Home;