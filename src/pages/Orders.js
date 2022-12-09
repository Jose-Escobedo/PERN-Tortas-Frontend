import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OrderList from "../components/OrderList";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import Loader from "../components/Loader";

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [userOrders, setUserOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  const [emptyOrders, setEmptyOrders] = useState(false);

  const TOKEN = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.user || "{}"
  )?.currentUser?.accessToken;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const getOrders = () => {
      fetch(`http://localhost:5000/api/orders/find/${user._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);

          setUserOrders(data);

          if (data.length === 0) {
            setEmptyOrders(true);
          }
        });
    };

    getOrders();
  }, [user]);

  let newArray;

  if (userOrders?.length !== 0) {
    userOrders?.map((item) => {
      item.products.map((inn) => inn._id).map((innItem) => innItem);
    });
  }

  //   idArray.forEach((item) => {
  //     fetch(`http://localhost:5000/api/products/find/${item}`, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setProducts(data);
  //       });
  //   });
  // }, []);

  // let idArray = [
  //   userOrders.products
  //     .map((innerItem) => innerItem._id)
  //     .map((innItem) => innItem),
  // ];

  // console.log(userOrders);

  return (
    <>
      <Container>
        <Navbar />
        <Wrapper>
          <Title>{`${user.username.toUpperCase()}'S ORDERS`}</Title>
          {loading ? (
            <Loader />
          ) : (
            <OrderListGrid>
              {emptyOrders ? (
                <>
                  <OrderEmptyContainer>
                    <OrderEmpty>You have not placed an order yet.</OrderEmpty>
                  </OrderEmptyContainer>
                </>
              ) : (
                userOrders?.map((item) => {
                  return <OrderList item={item} key={item._id} />;
                })
              )}
            </OrderListGrid>
          )}
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  padding: 3em;
  background: linear-gradient(
    90deg,
    rgba(24, 24, 71, 1) 0%,
    rgba(10, 10, 23, 1) 35%,
    rgba(0, 0, 0, 1) 100%
  );
  border-top: 1px solid black;
  ${mobile({ padding: "10px" })};
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  padding-bottom: 1em;
  color: white;
  margin-top: 1em;
`;

const OrderEmpty = styled.h1`
  font-weight: 300;
  text-align: center;
  padding-bottom: 1em;
  color: white;
`;

const OrderEmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  position: absolute;
`;

const OrderListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  grid-auto-rows: minmax(100px, auto);
  padding: 0 2em;

  animation: easeIn 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  @keyframes easeIn {
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default Orders;
