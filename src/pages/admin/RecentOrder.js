import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

const RecentOrder = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [recentOrder, setRecentOrder] = useState();
  const TOKEN = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.user || "{}"
  )?.currentUser?.accessToken;

  useEffect(() => {
    const getRecentOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/find/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: "Bearer " + TOKEN,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setRecentOrder(data);
          });
      } catch (error) {}
    };
    getRecentOrder();
  }, [id]);
  return (
    <>
      <AdminNavbar />
      <AdminContainer>
        <Sidebar />
        <AdminOrderContainer>
          <AdminOrderWrapper></AdminOrderWrapper>
        </AdminOrderContainer>
      </AdminContainer>
    </>
  );
};

const AdminContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;
const AdminOrderContainer = styled.div``;
const AdminOrderWrapper = styled.div``;

export default RecentOrder;
