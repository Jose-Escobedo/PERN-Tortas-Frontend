import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const ClosedStorePickup = () => {
  return (
    <>
      <Navbar />
      <ClosedText>
        <h2>Sorry, we are currently closed.</h2>
        <PickupTitle>Store Hours</PickupTitle>
        <h1>Monday 9:00 AM - 9:00 PM</h1>
        <h1>Tuesday 9:00 AM - 9:00 PM</h1>
        <h1>Wednesday 9:00 AM - 9:00 PM</h1>
        <h1>Thursday 9:00 AM - 9:00 PM</h1>
        <h1>Friday 9:00 AM - 9:00 PM</h1>
        <h1>Saturday 9:00 AM - 9:00 PM</h1>
        <h1>Sunday 10:00 AM - 9:00 PM</h1>
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

const PickupTitle = styled.h1`
  font-size: 2rem;
  padding: 10px;
  text-decoration: underline;
`;

export default ClosedStorePickup;
