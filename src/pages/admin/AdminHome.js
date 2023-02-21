import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Chart from "./Chart";
import SmallWidget from "./SmallWidget";
import LargeWidget from "./LargeWidget";
import FeaturedInfo from "./FeaturedInfo";
import AdminNavbar from "./AdminNavbar";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

const AdminHome = () => {
  const [userStats, setUserStats] = useState([]);
  const TOKEN = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.user || "{}"
  )?.currentUser?.accessToken;

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/Orders", {
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
      });
  }, []);

  return (
    <>
      <AdminNavbar />
      <AdminContainer>
        <Sidebar />
        <div className="home">
          <FeaturedInfo />
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
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

export default AdminHome;
