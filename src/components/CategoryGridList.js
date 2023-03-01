import React from "react";
import styled from "styled-components";
import tacoHuman from "../images/tacoHuman.png";
import { Link } from "react-router-dom";

const CategoryGridList = ({ item, index }) => {
  return (
    <CategoryGridBox key={index}>
      <CategoryGridLink to={`/product/${item._id}`}>
        <CategoryGridWrapper>
          <CategoryBoxDetails>
            <h2>{item.name}</h2>
            <h3 className="desc">{item.desc}</h3>
            <h3>{`$ ${item.price}`}</h3>
          </CategoryBoxDetails>
        </CategoryGridWrapper>
      </CategoryGridLink>
    </CategoryGridBox>
  );
};

const CategoryGridBox = styled.div`
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
const CategoryGridLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const CategoryGridWrapper = styled.div`
  display: flex;
  padding: 20px;
`;

const CategoryBoxDetails = styled.div`
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
    font-size: 1.3rem;
  }
`;

export default CategoryGridList;
