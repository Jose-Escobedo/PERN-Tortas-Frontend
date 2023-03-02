import React from "react";
import styled from "styled-components";
import tacoHuman from "../images/tacoHuman.png";
import { Link } from "react-router-dom";

const MenuGridList = ({ items }) => {
  return (
    <>
      <MenuCategoryList>
        <MenuCatLink>All</MenuCatLink>
        <MenuCatLink>Popular</MenuCatLink>
        <MenuCatLink>Tacos</MenuCatLink>
        <MenuCatLink>Tortas</MenuCatLink>
        <MenuCatLink>Burritos</MenuCatLink>
        <MenuCatLink>Specialties</MenuCatLink>
      </MenuCategoryList>
      <MenuItemsGrid>
        {items?.map((item, index) => {
          return (
            <MenuContainerBox key={index}>
              <MenuLink to={`/product/${item._id}`}>
                <MenuContainerWrapper>
                  <MenuBoxDetails>
                    <h2>{item.name}</h2>
                    <h3 className="desc">{item.desc}</h3>
                    <h3>{`$ ${item.price}`}</h3>
                  </MenuBoxDetails>
                  {/* <MenuBoxImg>
                <img src={tacoHuman} />
              </MenuBoxImg> */}
                </MenuContainerWrapper>
              </MenuLink>
            </MenuContainerBox>
          );
        })}
      </MenuItemsGrid>
    </>
  );
};

const MenuItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  grid-auto-rows: minmax(100px, auto);
  padding: 1em 2em;
`;
const MenuCategoryList = styled.ul`
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
`;

const MenuCatLink = styled.button`
  color: black;
  font-size: 1.3rem;
  text-decoration: none;
  padding: 1em 1em;
  height: 100%;
  border: none;
  background-color: white;
  cursor: pointer;
  transition: 0.2s all ease-in-out;

  &:hover {
    outline: 1px white solid;
    color: white;
    outline-offset: -2px;
    background-color: navy;
  }

  &:active {
    outline: 1px white solid;
    color: white;
    outline-offset: -2px;
    background-color: #3399ff;
  }

  @media screen and (max-width: 925px) {
    font-size: 1rem;
    padding: 0 0.5rem;
  }

  @media screen and (max-width: 840px) {
    font-size: 0.9rem;
    padding: 0 0.5rem;
  }
`;

const MenuContainerBox = styled.div`
  width: 100%;
  border: 1px solid black;
  transition: transform 0.1s;
  background: white;

  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 2px 2px 5px grey, -2px -2px 5px grey;
  }
`;
const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const MenuContainerWrapper = styled.div`
  display: flex;
  padding: 20px;
`;
const MenuBoxImg = styled.div`
  img {
    max-height: 130px;
    min-height: 50px;
    width: 100%;
  }
`;

const MenuBoxDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0.5em;

  h2 {
    padding-bottom: 0.3em;
  }

  .desc {
    font-weight: 300;
    padding-bottom: 0.5em;
  }
`;

export default MenuGridList;
