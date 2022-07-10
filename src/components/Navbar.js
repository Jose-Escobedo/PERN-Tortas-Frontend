import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <FaSearch />
          </SearchContainer>
        </Left>
        <Center></Center>
        <Right></Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 1rem;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 1.5em;
  padding: 0.4em;
`;

const Input = styled.input`
  border: none;
`;
const Center = styled.div`
  flex: 1;
`;
const Right = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default Navbar;
