import React from "react";
import styled from "styled-components";

const OrderList = ({ item }) => {
  return (
    <OrderListContainer>
      <h2>{`${item.createdAt.slice(0, 10)}`}</h2>
      <h2>{`${item.itemName}`}</h2>
      <h2>{`${item.itemQuantity}`}</h2>
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
