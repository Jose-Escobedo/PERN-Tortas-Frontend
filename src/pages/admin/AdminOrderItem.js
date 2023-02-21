import React from "react";

const AdminOrderItem = ({ item }) => {
  return (
    <>
      <div>{item.name}</div>
      <div>{item.extras}</div>
      <div>{item.quantity}</div>
      <div>{item.note}</div>
    </>
  );
};

export default AdminOrderItem;
