import styled from "styled-components";
import { useEffect, useState } from "react";
import { mobile } from "../responsive";
import MenuGridList from "./MenuGridList";

const Menu = () => {
  return (
    <Container>
      <Title>Menu</Title>
      <MenuGridList />
    </Container>
  );
};

const Container = styled.div`
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 2.5em;
  padding-top: 2.5em;
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
