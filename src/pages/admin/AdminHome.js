import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import SmallWidget from "./SmallWidget";
import LargeWidget from "./LargeWidget";
import FeaturedInfo from "./FeaturedInfo";
import AdminNavbar from "./AdminNavbar";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const user = useSelector((state) => state.user.currentUser);
  const admin = user?.isAdmin;
  const [recentOrders, setRecentOrders] = useState([]);
  const TOKEN = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.user || "{}"
  )?.currentUser?.accessToken;

  useEffect(() => {
    if (admin) {
      fetch("http://localhost:5000/api/orders/?new=true", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "Bearer " + TOKEN,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setRecentOrders(data);
        });
    } else {
      console.log("ERROR 404");
    }
  }, []);

  return (
    <>
      <AdminNavbar />
      <AdminContainer>
        <Sidebar />
        <div className="home">
          <FeaturedInfo />
          <AdminOrderContainer>
            <AdminOrderWrapper>
              {recentOrders.map((order, index) => {
                return (
                  <RecentOrderNameContainer key={index}>
                    <Link
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      to={`/orders/${order._id}`}
                    >
                      <RecentOrderName>
                        {`${order.dropoff_contact_given_name}` + " "}
                        {`${Array.from(order.dropoff_contact_family_name)[0]}` +
                          "."}
                      </RecentOrderName>
                      <RecentOrderTime>
                        {moment(order.createdAt).format("MM.DD. h:mm A")}
                      </RecentOrderTime>
                    </Link>
                  </RecentOrderNameContainer>
                );
              })}
            </AdminOrderWrapper>
          </AdminOrderContainer>
          <div className="homeWidgets">
            <SmallWidget />
            <LargeWidget />
          </div>
        </div>
      </AdminContainer>
    </>
  );
};

const AdminContainer = styled.div`
  display: flex;
  margin-top: 10px;

  .home {
    flex: 4;
  }
  .homeWidgets {
    display: flex;
    margin: 20px;
  }
`;

const AdminOrderContainer = styled.div``;
const AdminOrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  min-height: 30vh;
`;
const RecentOrderName = styled.span`
  font-size: 3rem;
  font-weight: bold;
`;
const RecentOrderTime = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;
const RecentOrderNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  min-height: 20vh;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: none;
    color: black;
  }
`;

export default AdminHome;
