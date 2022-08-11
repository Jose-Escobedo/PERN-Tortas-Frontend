import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      {/* <Announcement /> */}
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Menu />
      <Footer />
    </>
  );
};

export default Home;
