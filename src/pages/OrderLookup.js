import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import moment from "moment";

const OrderLookup = () => {
  const [orderNumberInfo, setOrderNumberInfo] = useState();
  const [orderNumber, setOrderNumber] = useState();

  const handleOrderNumber = (e) => {
    setOrderNumber(e.target.value);
  };

  useEffect(() => {
    console.log(orderNumberInfo);
  }, []);

  const handleOrderLookup = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/orders/lookup/${orderNumber}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderNumberInfo([data]);
        console.log(data);
      });
  };

  return (
    <>
      <OrderLookupPageContainer>
        <Navbar></Navbar>
        <TitleContainer>
          <Title>Order Lookup</Title>
          <OrderLookupInfoWrapper>
            <OrderLookupForm onSubmit={handleOrderLookup}>
              <OrderLookupNumber
                placeholder="Please enter your order #"
                onChange={handleOrderNumber}
              ></OrderLookupNumber>
              <OrderLookupButton>SEARCH</OrderLookupButton>
            </OrderLookupForm>
          </OrderLookupInfoWrapper>
        </TitleContainer>

        {orderNumberInfo ? (
          <OrderInfo>
            {orderNumberInfo?.map((item, index) => {
              let date;
              date = item.createdAt;
              let convertedDate;
              convertedDate = moment(date).format("MM.DD. h:mm A");
              let pickupOrDelivery;

              let pickupDate;
              pickupDate = item.pickup_date;
              let convertedPickupDate;
              convertedPickupDate = moment(pickupDate).format("MM.DD.");
              if (item.pickup === false) {
                pickupOrDelivery = "DELIVERY";
              } else {
                pickupOrDelivery = "PICKUP";
              }
              return (
                <OrderUl key={index}>
                  <h1>Order #: {item._id}</h1>
                  <h1>Created At: {convertedDate}</h1>
                  <h1>Order Type: {pickupOrDelivery}</h1>
                  <h1>Name: {item.dropoff_contact_given_name}</h1>
                  <h1>Email: {item.email}</h1>
                  {item.pickup ? (
                    <h1>
                      Pickup Date:
                      <br></br>
                      {convertedPickupDate}
                      <br></br>
                      Pickup Time:
                      <br></br>
                      {item.pickup_time}
                    </h1>
                  ) : (
                    <h1>
                      Order Tracking Link:
                      <br></br>
                      <br></br>
                      <a href={item.doordashTrackingLink}>
                        <TrackButton>TRACK ORDER</TrackButton>
                      </a>
                    </h1>
                  )}

                  {item.pickup ? (
                    <span>
                      Please refer to your email (check spam) for more order
                      info.
                      <br></br>
                      For all other issues, email us at{" "}
                      <a href="mailto: support@tortasmexico-studiocity.com">
                        support@tortasmexico-studiocity.com
                      </a>
                      .<br></br>
                      Call us at <a href="tel:8187602571"> (818-760-2571)</a>.
                    </span>
                  ) : (
                    <span>
                      If Tracking Link does not work please call us at{" "}
                      <a href="tel:8187602571"> (818-760-2571)</a>.<br></br>
                      For issues with Delivery, please contact Doordash at{" "}
                      <a href="tel:855-431-0459"> (855-431-0459)</a>.<br></br>
                      Please refer to your email (check spam) for more order
                      info.
                      <br></br>
                      For all other issues, email us at{" "}
                      <a href="mailto: support@tortasmexico-studiocity.com">
                        support@tortasmexico-studiocity.com
                      </a>
                      .<br></br>
                      Call us at <a href="tel:8187602571"> (818-760-2571)</a>.
                    </span>
                  )}
                </OrderUl>
              );
            })}
          </OrderInfo>
        ) : (
          <LookupImgWrapper>
            <img
              id="lookup-img"
              src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/16305636_3700_2_01-removebg-preview.png?alt=media&token=f9c79de9-bb06-4e74-a4f4-091c18891379"
            ></img>
          </LookupImgWrapper>
        )}
      </OrderLookupPageContainer>
      <Footer></Footer>
    </>
  );
};

const OrderLookupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10vh;
  background: #fcf5f5;
  min-height: 50vh;
  #lookup-img {
    width: 450px;
    height: 450px;
    @media screen and (max-width: 450px) {
      width: 350px;
      height: 350px;
    }
  }
`;

const LookupImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const OrderLookupInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TrackButton = styled.button`
  width: 50%;
  border: none;
  border-radius: 20px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  margin-top: 20px;
  h1 {
    @media screen and (max-width: 630px) {
      font-size: 1.5rem;
      padding: 20px;
    }
  }
`;
const OrderUl = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    padding-bottom: 20px;
  }
  a {
    padding-bottom: 10px;
  }
  span {
    padding-bottom: 20px;
    font-size: 1.1rem;
    @media screen and (max-width: 630px) {
      font-size: 0.8rem;
      padding: 20px;
    }
  }
`;
const OrderLookupNumber = styled.input`
  width: 100%;
  border-radius: 20px;
  border: 1px solid black;
  color: black;
  padding: 15px 15px;
  margin-bottom: 20px;
  font-size: 1rem;
`;
const OrderLookupForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;
const OrderLookupButton = styled.button`
  width: 70%;
  border: none;
  border-radius: 20px;
  padding: 15px 15px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fcf5f5;
  padding-top: 50px;
`;
const Title = styled.h1`
  font-size: 4rem;

  @media screen and (max-width: 450px) {
    font-size: 2.5rem;
  }
`;

export default OrderLookup;
