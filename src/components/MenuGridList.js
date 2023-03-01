import React from "react";
import styled from "styled-components";
import tacoHuman from "../images/tacoHuman.png";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll/modules";
import { Link as LinkS } from "react-scroll";

const MenuGridList = ({ items }) => {
  return (
    <>
      <MenuCategoryList>
        <MenuCatLink
          activeClass="active"
          to="tacos"
          spy={true}
          smooth={true}
          hashSpy={true}
          offset={50}
          duration={500}
          delay={1000}
          isDynamic={true}
          ignoreCancelEvents={false}
          spyThrottle={500}
        >
          Tacos
        </MenuCatLink>
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
  padding: 0 2em;
`;
const MenuCategoryList = styled.ul`
  width: 100%;
  padding: 30px;
`;

const MenuCatLink = styled(LinkS)`
  color: black;
  font-size: 1.3rem;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  transition: 0.2s all ease-in-out;

  &:hover {
    border-bottom: 3px solid #00ffff;
  }

  &:active {
    border-bottom: 3px solid #00ffff;
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
