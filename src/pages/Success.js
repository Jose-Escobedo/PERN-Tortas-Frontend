import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Success = () => {
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
