import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AdminNavbar from "./AdminNavbar";
import AdminOrderItem from "./AdminOrderItem";
import moment from "moment";
import doubleLeft from "../../images/double-left.png";
import { Link } from "react-router-dom";
import axios from "axios";

const RecentOrder = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [recentOrder, setRecentOrder] = useState();
  const pickupObj = recentOrder?.pickup;
  const TOKEN = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.user || "{}"
  )?.currentUser?.accessToken;

  const currentDate = moment().toISOString();

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/find/order/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecentOrder(data);
      });
  }, [id]);

  const handlePrepTime = (e) => {
    console.log(e.target.value);
    const timeAdded = e.target.value;
    const externalDDid = String(recentOrder._id);

    if (e.target.value === 0) {
      fetch(
        `https://openapi.doordash.com/drive/v2/deliveries/${externalDDid}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pickup_time: moment().toISOString(),
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      fetch(
        `https://openapi.doordash.com/drive/v2/deliveries/${externalDDid}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pickup_time: moment(currentDate)
              .add(timeAdded, "m")
              .toDate()
              .toISOString(),
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <>
      <AdminNavbar />
      <AdminContainer>
        <AdminOrderContainer>
          <AdminOrderBackButton>
            <Link
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              to={"/admin-home"}
            >
              <img src={doubleLeft}></img>
            </Link>
            <h2>Back to Orders</h2>
          </AdminOrderBackButton>
          <AdminOrderWrapper>
            <AdminOrderTitle>ORDER DETAILS</AdminOrderTitle>
            <AdminOrderName>
              {`NAME: ${recentOrder?.dropoff_contact_given_name.toUpperCase()}`}
            </AdminOrderName>
            <AdminOrderTime>
              {`ORDER CREATED AT: ${moment(recentOrder?.createdAt).format(
                "MM.DD. h:mm A"
              )}`}
            </AdminOrderTime>
            <AdminOrderAddress>{recentOrder?.address}</AdminOrderAddress>
            {pickupObj ? (
              <h2 id="pickupobj">PICKUP</h2>
            ) : (
              <h2 id="pickupobj">DELIVERY</h2>
            )}

            <AdminOrderPrepTime onClick={handlePrepTime}>
              <button value={0}>NOW</button>
              <button value={15}>15 MIN</button>
              <button value={30}>30 MIN</button>
              <button value={45}>45 MIN</button>
              <button value={60}>60 MIN</button>
            </AdminOrderPrepTime>

            <AdminOrderItemsContainer>
              {recentOrder?.products.map((item, index) => {
                return <AdminOrderItem key={index} item={item} />;
              })}
            </AdminOrderItemsContainer>
            <AdminOrderTotal>{`TOTAL: $ ${recentOrder?.total}`}</AdminOrderTotal>
            <AdminOrderTotal>{`TIP: $ ${recentOrder?.tip}`}</AdminOrderTotal>
            <DoordashSupportId>
              {`Tracking Link: `}
              <a href={`${recentOrder?.doordashTrackingLink}`}>
                {recentOrder?.doordashTrackingLink}
              </a>
            </DoordashSupportId>
            <DoordashSupportId>{`Doordash Reference: #${Number(
              recentOrder?.doordashSupportId
            )}`}</DoordashSupportId>
          </AdminOrderWrapper>
        </AdminOrderContainer>
      </AdminContainer>
    </>
  );
};

const AdminContainer = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 25px;
`;
const AdminOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  min-height: 30vh;
  border: 1px solid black;
  width: 100%;
`;
const AdminOrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  #pickupobj {
    font-size: 2rem;
  }
`;

const AdminOrderBackButton = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 70px;
    height: 70px;
  }
  h2 {
    font-size: 2.5rem;
    padding-left: 3%;
  }
  padding-bottom: 3%;
`;

const AdminOrderTitle = styled.h2`
  font-size: 2rem;
  padding-bottom: 10px;
`;

const AdminOrderName = styled.span`
  font-size: 2rem;
  padding-bottom: 10px;
`;
const AdminOrderTime = styled.span`
  font-size: 2rem;
  padding-bottom: 10px;
`;
const AdminOrderAddress = styled.span`
  font-size: 2rem;
  padding-bottom: 10px;
`;

const AdminOrderPrepTime = styled.div`
  padding: 3% 0;
  display: flex;
  justify-content: space-evenly;
  button {
    border-radius: 20px;
    cursor: pointer;
    padding: 1em;
    font-size: 1.5rem;
  }
`;
const AdminOrderItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  gap: 25px;
`;
const AdminOrderTotal = styled.span`
  font-size: 2rem;
  margin-top: 3%;
`;
const AdminOrderTip = styled.span`
  font-size: 2rem;
  margin-top: 3%;
`;
const DoordashSupportId = styled.span`
  font-size: 2rem;
  margin-top: 3%;
`;

export default RecentOrder;
