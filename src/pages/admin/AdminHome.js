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

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

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
