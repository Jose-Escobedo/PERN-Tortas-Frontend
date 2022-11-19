import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";

const OptionalDelivery = ({}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <OptionalDeliveryContainer>
        <Wrapper>
          <h1>This Order is for...</h1>
          <TwoBoxContainer>
            <DeliveryButton>Delivery</DeliveryButton>
            <PickupButton>Pickup</PickupButton>
          </TwoBoxContainer>
        </Wrapper>
      </OptionalDeliveryContainer>
      <Footer />
    </>
  );
};

const OptionalDeliveryContainer = styled.div`
  min-height: 80vh;
  min-width: 100%;
  padding: 5em 0em;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  color: white;

  background: linear-gradient(
    90deg,
    rgba(24, 24, 71, 1) 0%,
    rgba(10, 10, 23, 1) 35%,
    rgba(0, 0, 0, 1) 100%
  );
`;

const TwoBoxContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  align-items: center;
  padding: 3em 0em;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const DeliveryButton = styled.button`
  padding: 2em;
  border: none;
  cursor: pointer;
  font-size: 3rem;
  width: 35%;
`;

const PickupButton = styled.button`
  padding: 2em;
  border: none;
  cursor: pointer;
  width: 35%;
  font-size: 3rem;
`;
export default OptionalDelivery;
