import React from "react";
import styled from "styled-components";

const AdminOrderItem = ({ item }) => {
  return (
    <ItemContainer>
      <ItemNameQuantityWrapper>
        <ItemQuantity>{`${item.quantity} x `}</ItemQuantity>
        <ItemName>{item.name}</ItemName>
      </ItemNameQuantityWrapper>
      <div>{item.extras}</div>

      <div>{item.note}</div>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  border: 1px solid black;
  padding: 25px;
`;

const ItemNameQuantityWrapper = styled.div`
  display: flex;
`;
const ItemName = styled.h1``;
const ItemQuantity = styled.h1``;
const ItemNameWrapper = styled.div``;

export default AdminOrderItem;
