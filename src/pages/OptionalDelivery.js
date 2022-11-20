import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import deliverySvg from "../images/delivery.svg";
import pickupSvg from "../images/pickup.svg";

const OptionalDelivery = ({}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <OptionalDeliveryContainer>
        <Wrapper>
          <h1>This Order is for...</h1>
          <TwoBoxContainer>
            <DeliveryWrapper>
              <DeliveryButton>Delivery</DeliveryButton>
              <img src={deliverySvg}></img>
            </DeliveryWrapper>
            <PickupWrapper>
              <PickupButton>Pickup</PickupButton>
              <img src={pickupSvg}></img>
            </PickupWrapper>
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

const DeliveryWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 40%;
  img {
    width: 250px;
    height: 250px;
  }
`;

const DeliveryButton = styled.button`
  padding: 1.3em;
  border: none;
  cursor: pointer;
  font-size: 3rem;
  width: 100%;
  margin-bottom: 1.5rem;
  border-radius: 20px;
`;

const PickupWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 40%;
  align-items: center;
  img {
    width: 250px;
    height: 250px;
  }
`;

const PickupButton = styled.button`
  padding: 1.3em;
  border: none;
  cursor: pointer;
  font-size: 3rem;
  width: 100%;
  margin-bottom: 1.5rem;
  border-radius: 20px;
`;
export default OptionalDelivery;
