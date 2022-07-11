import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import { mobile } from "../responsive";
const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <FaSearch style={{ color: "gray", fontSize: "1rem" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Tortas Mexico Studio City</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 1rem;
  cursor: pointer;
  ${mobile({ display: "none" })}
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
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  width: 100%;
  @media screen and (max-width: 1200px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 900px) {
    font-size: 1rem;
  }
  ${mobile({ fontSize: "1.5 rem" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 1rem;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;
export default Navbar;
