import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import ArrowLeftOutlined from "@material-ui/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import { mobile } from "../responsive";
import { menuCatArray1, menuCatArray2, menuCatArray3 } from "../data";

const MenuGridList = ({ items }) => {
  const [toggle, setToggle] = useState(true);
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState();
  const [filteredItems, setFilteredItems] = useState(products);
  const [slideIndex, setSlideIndex] = useState(0);
  const active = { backgroundColor: "black", opacity: "0.8", color: "white" };
  const inactive = {};
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products");
        setProducts(res.data);
        setFilteredItems(res.data);
        console.log("menu", res.data);
      } catch (error) {}
    };
    getProduct();
    setCategory("All");
  }, []);

  useEffect(() => {
    handleFilter(category);
  }, [category]);

  const handleCatSelection = (e) => {
    setCategory(e.target.value);
    console.log(category);
    setSelected(e.target.id);
  };

  const handleFilter = (cat) => {
    if (cat === "All") {
      return setFilteredItems(products);
    } else {
      setFilteredItems(products.filter((i) => i.categories.includes(cat)));
    }
  };

  const onToggle = () => {
    setToggle(!toggle);
  };

  const handleMenuArrowClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <>
      <MenuCatContainer>
        <Arrow direction="left" onClick={() => handleMenuArrowClick("left")}>
          <ArrowLeftOutlined />
        </Arrow>
        <MenuCategoryList slideIndex={slideIndex}>
          <MenuCatLinkWrapper id="list1">
            {menuCatArray1.map((item, index) => {
              return (
                <MenuCatLink
                  style={selected == item.id ? active : inactive}
                  onClick={handleCatSelection}
                  value={item.value}
                  id={item.id}
                >
                  {item.option}
                </MenuCatLink>
              );
            })}
          </MenuCatLinkWrapper>

          <MenuCatLinkWrapper id="list2">
            {menuCatArray2.map((item) => {
              return (
                <MenuCatLink
                  style={selected == item.id ? active : inactive}
                  onClick={handleCatSelection}
                  value={item.value}
                  id={item.id}
                >
                  {item.option}
                </MenuCatLink>
              );
            })}
          </MenuCatLinkWrapper>

          <MenuCatLinkWrapper id="list3">
            {menuCatArray3.map((item) => {
              return (
                <MenuCatLink
                  style={selected == item.id ? active : inactive}
                  onClick={handleCatSelection}
                  value={item.value}
                  id={item.id}
                >
                  {item.option}
                </MenuCatLink>
              );
            })}
          </MenuCatLinkWrapper>
        </MenuCategoryList>

        <Arrow direction="right" onClick={() => handleMenuArrowClick("right")}>
          <ArrowRightOutlined />
        </Arrow>
      </MenuCatContainer>
      <MenuCatTitle>
        {category === "All"
          ? null
          : String(category).toUpperCase().replace(/-/g, " ")}
      </MenuCatTitle>
      <MenuItemsGrid>
        {filteredItems?.map((item, index) => {
          return (
            <MenuContainerBox key={index}>
              <MenuLink to={`/product/${item._id}`}>
                <MenuContainerWrapper>
                  <MenuBoxDetails>
                    <h2>{item.name}</h2>
                    <h3 className="desc">{item.desc}</h3>
                    <h3>{`$ ${item.price}`}</h3>
                  </MenuBoxDetails>
                </MenuContainerWrapper>
              </MenuLink>
            </MenuContainerBox>
          );
        })}
      </MenuItemsGrid>
    </>
  );
};

const MenuCatContainer = styled.div`
  height: 15vh;
  position: relative;
  background-color: #fcf5f5;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const MenuItemsGrid = styled.div`
  display: grid;
  overflow: hidden;
  justify-content: space-evenly;
  align-items: center;
  align-content: space-evenly;
  justify-items: center;
  background-color: #fcf5f5;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  grid-auto-rows: minmax(100px, auto);
  padding: 2em 2em;
`;

const MenuCategoryList = styled.div`
  display: flex;
  width: 300%;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  #list1 {
    width: 100%;
  }
  #list2 {
    width: 100%;
  }
  #list3 {
    width: 100%;
  }
`;

const MenuCatLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuCatTitle = styled.h1`
  text-align: center;
  background-color: #fcf5f5;
  font-size: 2.5rem;
  padding: 20px;
  transition: 0.5s all ease-in-out;
`;

const MenuCatLink = styled.button`
  color: black;
  font-size: 1.3rem;
  text-decoration: none;
  padding: 1em 1em;
  border: none;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  background-color: white;

  &:hover {
    outline: 1px white solid;
    color: white;
    outline-offset: -2px;
    background-color: black;
    opacity: 0.8;
  }

  &:active {
    outline: 1px white solid;
    color: white;
    outline-offset: -2px;
    background-color: black;
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

const Arrow = styled.div`
  width: 35px;
  height: 35px;
  color: white;
  background-color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: ${(props) => props.direction === "left" && "100px"};
  right: ${(props) => props.direction === "right" && "100px"};
  margin: auto;
  bottom: 0;
  top: 0;
  cursor: pointer;
  opacity: 0.8;
  z-index: 2;
`;

const MenuContainerBox = styled.div`
  width: 90%;
  border: 1px solid black;
  border-radius: 20px;
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
