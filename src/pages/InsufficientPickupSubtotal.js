import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const InsufficientPickupSubtotal = () => {
  return (
    <>
      <Navbar />
      <InsufficientSubtotalContainer>
        <MinimumText>
          Pickup subtotal minimum not met. Please add more items to cart.
        </MinimumText>
      </InsufficientSubtotalContainer>
      <Footer />
    </>
  );
};

export const InsufficientSubtotalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(24, 24, 71, 1) 0%,
    rgba(10, 10, 23, 1) 35%,
    rgba(0, 0, 0, 1) 100%
  );
`;

const MinimumText = styled.div`
  color: red;
  font-weight: bold;
  font-size: 1.5rem;
  @media screen and (max-width: 800px) {
    font-size: 1rem;
    padding: 10px;
  }
  @media screen and (max-width: 550px) {
    font-size: 0.8rem;
  }
`;
export default InsufficientPickupSubtotal;
