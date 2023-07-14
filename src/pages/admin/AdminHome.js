import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import SmallWidget from "./SmallWidget";
import LargeWidget from "./LargeWidget";
import FeaturedInfo from "./FeaturedInfo";
import AdminNavbar from "./AdminNavbar";
import { useEffect, useMemo, useState, useRef } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import sound from "./Assets/smb_powerup.wav";
import AdminModal from "../../components/AdminModal";
const socket = io.connect("http://localhost:5000");

const AdminHome = () => {
  const user = useSelector((state) => state.user.currentUser);
  const admin = user?.isAdmin;
  const [recentOrders, setRecentOrders] = useState([]);
  const TOKEN = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.user || "{}"
  )?.currentUser?.accessToken;

  const [openModal, setOpenModal] = useState(true);

  const play = () => {
    new Audio(sound).play();
  };

  // useEffect(() => {
  //   if (admin) {
  //     fetch("http://localhost:5000/api/orders/?new=true", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         authorization: "Bearer " + TOKEN,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setRecentOrders(data);
  //       });
  //   } else {
  //     console.log("ERROR 404");
  //   }
  // }, []);
  function pollingServerForOrders(curr) {
    console.log("Checking for orders...");

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
  }

  useEffect(() => {
    pollingServerForOrders();
    socket.on("NewOrder", () => {
      console.log("New Order!");
      pollingServerForOrders();
      play();
    });
  }, []);

  return (
    <>
      <AdminNavbar />
      <AdminContainer>
        <AdminModal open={openModal} close={() => setOpenModal(false)} />
        <Sidebar />
        <div className="home">
          <FeaturedInfo />
          <AdminOrderContainer>
            <Button
              id="modalbtn1"
              className="btn"
              onClick={() => setOpenModal(true)}
            >
              Order Sound
            </Button>
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
                        {/* // .add("00:27", "HH:mm") */}
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
const Button = styled.button`
  display: none;
  /* display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  &:hover {
    border: 1px solid aquamarine;
    transition: all 0.5s ease-in-out;
    background-color: black;
    h2 {
      color: white;
    }
    &:first-child {
      color: white;
    }
  }
  &:first-child {
    color: teal;
    font-size: 1rem;
  } */
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
