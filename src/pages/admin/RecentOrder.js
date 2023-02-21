import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import moment from "moment";

const RecentOrder = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [recentOrder, setRecentOrder] = useState();
  const TOKEN = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.user || "{}"
  )?.currentUser?.accessToken;

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
  return (
    <>
      <AdminNavbar />
      <AdminContainer>
        <Sidebar />
        <AdminOrderContainer>
          <AdminOrderWrapper>
            <AdminOrderTitle>Order Details</AdminOrderTitle>
            <AdminOrderName>
              {recentOrder?.dropoff_contact_given_name}
            </AdminOrderName>
            <AdminOrderTime>
              {moment(recentOrder?.createdAt).format("MM.DD. h:mm A")}
            </AdminOrderTime>
            <AdminOrderAddress>{recentOrder.address}</AdminOrderAddress>
            <AdminOrderItemsContainer></AdminOrderItemsContainer>
            <AdminOrderTotal></AdminOrderTotal>
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
`;

const AdminOrderTitle = styled.h2`
  font-size: 2rem;
`;

const AdminOrderName = styled.span`
  font-size: 2rem;
`;
const AdminOrderTime = styled.span`
  font-size: 2rem;
`;
const AdminOrderAddress = styled.span`
  font-size: 2rem;
`;
const AdminOrderItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const AdminOrderTotal = styled.span`
  font-size: 2rem;
`;

export default RecentOrder;
