import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";

const OrderList = ({ item }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = () => {
      fetch(
        `http://localhost:5000/api/products/find/${item.products
          .map((innerItem) => innerItem._id)
          .map((innItem) => innItem)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        });
    };
    getProducts();
  }, []);

  console.log(item.products.map((innerItem) => innerItem.quantity));

  // console.log(products.name);

  return (
    <OrderListContainer>
      <h2>{`${item.createdAt.slice(0, 10)}`}</h2>
      <h2>{`${products.name}`}</h2>
      <h2>{`${item.products.map((innerItem) => innerItem.quantity)}`}</h2>
      <h2>{`$ ${item.totalWithTip.toFixed(2)}`}</h2>
    </OrderListContainer>
  );
};

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export default OrderList;
