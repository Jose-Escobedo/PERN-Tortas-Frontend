import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartRedux";

const Success = ({ address }) => {
  const dispatch = useDispatch();

  dispatch(clearCart());
  return (
    <>
      <Navbar />
      <SuccessContainer>
        <SuccessText>Thank you for your order!</SuccessText>
      </SuccessContainer>
      <Footer />
    </>
  );
};

export const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const SuccessText = styled.div`
  color: red;
  font-weight: bold;
  font-size: 1.5rem;
`;

export default Success;
