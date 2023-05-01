import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MenuGridList from "../components/MenuGridList";

const Menu = () => {
  return (
    <MenuPageContainer>
      <Navbar></Navbar>
      <MenuGridList id="menu-grid"></MenuGridList>
      <Footer></Footer>
    </MenuPageContainer>
  );
};

const MenuPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20vh;
  background: #fcf5f5;
`;

export default Menu;
