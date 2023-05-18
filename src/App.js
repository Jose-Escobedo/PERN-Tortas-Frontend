import React from "react";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Success from "./pages/Success";
import AdminHome from "./pages/admin/AdminHome";
import { useSelector } from "react-redux";
import "@stripe/stripe-js";
import CheckoutInfo from "./pages/CheckoutInfo";
import Orders from "./pages/Orders";
import OptionalDelivery from "./pages/OptionalDelivery";
import InsufficientSubtotal from "./pages/InsufficientSubtotal";
import PickupInfo from "./pages/PickupInfo";
import InsufficientPickupSubtotal from "./pages/InsufficientPickupSubtotal";
import Accessibility from "./pages/Accessibility";
import RecentOrder from "./pages/admin/RecentOrder";
import Error404 from "./pages/Error404";
import Menu from "./pages/Menu";
import OrderLookup from "./pages/OrderLookup";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const admin = user?.isAdmin;
  const isLessThanTwenty = cart.subtotal < 20;
  const isLessThanFive = cart.subtotal < 5;

  return (
    <>
      <Routes>
        {admin ? (
          <Route exact path="/admin-home" element={<AdminHome />} />
        ) : null}
        {admin ? (
          <Route exact path="/orders/:id" element={<RecentOrder />} />
        ) : null}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />

        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route exact path="/products/:cat" element={<ProductList />} />
        <Route exact path="/products" element={<ProductList />} />
        <Route exact path="/product/:id" element={<Product />} />

        <Route exact path="/success" element={<Success />} />
        <Route exact path="/deliverycheckout" element={<CheckoutInfo />} />
        <Route exact path="/pickupcheckout" element={<PickupInfo />} />
        <Route exact path="/optionaldelivery" element={<OptionalDelivery />} />
        <Route exact path="/accessibility" element={<Accessibility />} />
        <Route
          exact
          path="/insufficentsubtotal"
          element={
            isLessThanTwenty ? (
              <InsufficientSubtotal />
            ) : (
              <Navigate to="/optionaldelivery" />
            )
          }
        />
        <Route
          exact
          path="/orders"
          element={user ? <Orders /> : <Navigate to="/" />}
        />
        <Route exact path="/order-lookup" element={<OrderLookup />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
