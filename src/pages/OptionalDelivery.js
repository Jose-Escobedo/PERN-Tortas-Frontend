import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import deliverySvg from "../images/delivery.svg";
import pickupSvg from "../images/pickup.svg";
import { Link } from "react-router-dom";

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
              <Link to="/checkout" style={{ width: "100%" }}>
                <DeliveryButton>
                  <h3 className="click-btn delivery">Delivery</h3>
                </DeliveryButton>
              </Link>
              <img src={deliverySvg}></img>
            </DeliveryWrapper>
            <PickupWrapper>
              <PickupButton>
                <h3 className="click-btn pickup">Pickup</h3>
              </PickupButton>
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
  background: lightgrey;

  .click-btn {
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    line-height: 35px;
    border: 1px solid;
    text-align: center;
    font-size: 3rem;
    text-decoration: none;
    transition: all 0.35s;
    box-sizing: border-box;
  }
  .delivery {
    position: relative;
    border-color: transparent;
    color: black;
    &::before,
    &::after {
      height: 100%;
      position: absolute;
      top: 0;
      transition: all 0.3s;
      content: "";
    }

    &::before {
      width: 100%;
      left: 0;
      background-color: white;
      z-index: -1;
    }
    &::after {
      width: 0;
      left: 50%;
      border-bottom: 1px solid transparent;
      transform: translate(-50%, 0);
      z-index: 1;
    }
    &:hover {
      color: rgb(116, 13, 24);
      &::before {
        transform: scale(0, 1);
      }
      &::after {
        width: 100%;
        border-color: black;
        transition-delay: 0.2s;
      }
    }
  }
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
  background: lightgrey;

  .click-btn {
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    line-height: 35px;
    border: 1px solid;
    text-align: center;
    font-size: 3rem;
    text-decoration: none;
    transition: all 0.35s;
    box-sizing: border-box;
  }
  .pickup {
    position: relative;
    border-color: transparent;
    color: black;
    &::before,
    &::after {
      height: 100%;
      position: absolute;
      top: 0;
      transition: all 0.3s;
      content: "";
    }

    &::before {
      width: 100%;
      left: 0;
      background-color: white;
      z-index: -1;
    }
    &::after {
      width: 0;
      left: 50%;
      border-bottom: 1px solid transparent;
      transform: translate(-50%, 0);
      z-index: 1;
    }
    &:hover {
      color: rgb(13, 34, 116);
      &::before {
        transform: scale(0, 1);
      }
      &::after {
        width: 100%;
        border-color: black;
        transition-delay: 0.2s;
      }
    }
  }
`;
export default OptionalDelivery;
