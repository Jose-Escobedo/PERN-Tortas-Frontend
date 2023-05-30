import styled from "styled-components";
import { useEffect, useState } from "react";
import { mobile } from "../responsive";
import MenuGridList from "./MenuGridList";

const Menu = () => {
  return (
    <Container id="menu">
      <TitleContainer>
        <Title>Menu</Title>
        <MenuCatPicture>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/TacoChef.png?alt=media&token=12efb46e-9f85-4be8-a9b1-5f8022cdd779"
            }
            alt="illustration of a taco that looks like a chef"
          ></img>
        </MenuCatPicture>
      </TitleContainer>
      <MenuGridList />
    </Container>
  );
};

const Container = styled.div``;
const MenuCatPicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcf5f5;
  img {
    width: 160px;
    height: 160px;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fcf5f5;
  padding-top: 50px;
`;
const Title = styled.h1`
  font-size: 4rem;
`;

const Desc = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.3em;
  font-weight: 300;
  ${mobile({ textAlign: "center" })}
`;

export default Menu;
