import React from "react";
import styled from "styled-components";

const AdminOrderItem = ({ item }) => {
  return (
    <ItemContainer>
      <ItemNameQuantityWrapper>
        <ItemQuantity>{`${item.quantity} x `}</ItemQuantity>
        <ItemName>{item.name}</ItemName>
      </ItemNameQuantityWrapper>

      {(() => {
        if (item.itemCombo[0].firstItem === "") {
          return <></>;
        } else {
          return (
            <ItemVariationContainer>
              <h2>VARIATION:</h2>
              <h2 id="item-object">{item.itemCombo[0].firstItem}</h2>
              <h2 id="item-object">{item.itemCombo[0].secondItem}</h2>
            </ItemVariationContainer>
          );
        }
      })()}

      {(() => {
        if (item.extras.length == 0 || item.extras[0] == "") {
          return <></>;
        } else {
          return (
            <ItemExtrasContainer>
              <h2>EXTRAS:</h2>
              {item.extras.map((extra) => {
                return extra.map((ex, index) => (
                  <h2 key={index} id="extra-object">
                    {ex}
                  </h2>
                ));
              })}
            </ItemExtrasContainer>
          );
        }
      })()}

      {(() => {
        if (
          !item.note ||
          item.note === "" ||
          item.note[0] === "" ||
          item.note.length === 0
        ) {
          return <></>;
        } else {
          return (
            <ItemNoteContainer>
              <h2>NOTE:</h2>
              <h2 id="note-text">{item.note[0]?.toUpperCase()}</h2>
            </ItemNoteContainer>
          );
        }
      })()}
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  border: 1px solid black;
  padding: 25px;
`;

const ItemNameQuantityWrapper = styled.div`
  display: flex;
  padding: 15px;
`;
const ItemName = styled.h1``;
const ItemQuantity = styled.h1``;
const ItemExtrasContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  #extra-object {
    padding-left: 10px;
  }
`;
const ItemNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  #note-text {
    color: red;
    padding-left: 10px;
  }
`;
const ItemVariationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  #item-object {
    color: red;
    padding-left: 10px;
  }
`;

export default AdminOrderItem;
