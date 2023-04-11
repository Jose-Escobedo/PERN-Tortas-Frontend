import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const ClosedStore = () => {
  return (
    <>
      <Navbar />
      <ClosedText>
        <h2>Sorry, we are currently closed.</h2>
        <DeliveryTitle>Delivery Hours</DeliveryTitle>
        <h1>Monday 9:30 AM - 8:30 PM</h1>
        <h1>Tuesday 9:30 AM - 8:30 PM</h1>
        <h1>Wednesday 9:30 AM - 8:30 PM</h1>
        <h1>Thursday 9:30 AM - 8:30 PM</h1>
        <h1>Friday 9:30 AM - 8:30 PM</h1>
        <h1>Saturday 9:30 AM - 8:30 PM</h1>
        <h1>Sunday 10:30 AM - 8:30 PM</h1>
      </ClosedText>
      <Footer />
    </>
  );
};

const ClosedText = styled.div`
  min-height: 60vh;
  margin-top: 10vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 2rem;
  }
`;

const DeliveryTitle = styled.h1`
  font-size: 2rem;
  padding: 10px;
  text-decoration: underline;
`;

export default ClosedStore;
