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
      <SuccessContainer>Thank You for your Order!</SuccessContainer>
      <Footer />
    </>
  );
};

export const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Success;
