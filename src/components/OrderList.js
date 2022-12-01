import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import tacoHuman from "../images/tacoHuman.png";

const OrderList = ({ item }) => {
  const [products, setProducts] = useState([]);
  const pickupObj = item.pickup;
  const tipObj = item.tip;

  useEffect(() => {
    // const getProducts = () => {
    //   fetch(
    //     `http://localhost:5000/api/products/find/${item.products
    //       .map((innerItem) => innerItem._id)
    //       .map((innItem) => innItem)}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setProducts(data);
    //     });
    // };
    // getProducts();
  });

  return (
    <OrderListContainer>
      <OrderWrapper>
        <OrderLogo>
          <img src={tacoHuman} />
        </OrderLogo>
        <OrderDetails>
          <h2>{`${item.createdAt.slice(0, 10)}`}</h2>
          <h2>{`${item.products.map(
            (innerItem) => `${innerItem.quantity} ${innerItem.name} `
          )}`}</h2>
          {tipObj ? <h2>{`Tip: $ ${item.tip}`}</h2> : <h2>{`Tip: $ 0`}</h2>}
          <h2>{`Order Total: ${(item.total / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`}</h2>
          {pickupObj ? <h2>PICKUP</h2> : <h2>DELIVERY</h2>}
        </OrderDetails>
      </OrderWrapper>
    </OrderListContainer>
  );
};

const OrderListContainer = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid black;
  transition: transform 0.1s;
  background: white;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 2px 2px 5px grey, -2px -2px 5px grey;
  }
`;

const OrderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const OrderDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1em 1em;
`;

const OrderLogo = styled.div`
  img {
    max-height: 130px;
    min-height: 50px;
    width: 100%;
  }
`;

export default OrderList;
