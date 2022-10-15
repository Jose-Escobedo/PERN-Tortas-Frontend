import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OrderList from "../components/OrderList";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [userOrders, setUserOrders] = useState(null);
  const [products, setProducts] = useState([]);

  // const [orderProductId, setOrderProductId] = useState(
  //   String(userOrders?.products.map((item) => item._id)[0])
  // );

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/");
        setProducts(res.data);
      } catch (error) {}
    };
  }, []);

  const productArr = userOrders?.map((item) => {
    return console.log(
      item.products.map((innerItem) => {
        return innerItem._id;
      })
    );
  });

  const TOKEN = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.user || "{}"
  )?.currentUser?.accessToken;
  useEffect(() => {
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
          setUserOrders(data);
          data.map((item) => console.log(item));
        });
    };
    getOrders();
  }, []);

  return (
    <>
      <Container>
        <Navbar />
        <Wrapper>
          <Title>{`${user.username.toUpperCase()}'S ORDERS`}</Title>
          {userOrders?.map((item) => {
            return <OrderList item={item} key={item._id} />;
          })}
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  padding: 1.3em;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

export default Orders;
