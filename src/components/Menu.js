import styled from "styled-components";
import { useEffect, useState } from "react";
import { mobile } from "../responsive";
import MenuGridList from "./MenuGridList";

const Menu = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Menu</Title>
      </TitleContainer>
      <MenuGridList />
    </Container>
  );
};

const Container = styled.div``;
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
  margin-bottom: 0.8em;
`;

const Desc = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.3em;
  font-weight: 300;
  ${mobile({ textAlign: "center" })}
`;

export default Menu;
