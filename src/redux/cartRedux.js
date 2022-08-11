import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    taxes: 0,
    subtotal: 0,
    delivery: 4.99,
    total: 4.99,
  },
  reducers: {
    addProduct: (state, action) => {
      const subtotal = action.payload.price * action.payload.quantity;
      const tax = subtotal * 0.095;
      const total = subtotal + tax;
      state.quantity += 1;
      state.products.push(action.payload);
      state.subtotal += subtotal;
      state.taxes += tax;
      state.total += total;
    },
    removeProduct: (state, action) => {
      const subtotal = action.payload.price * action.payload.quantity;
      const tax = subtotal * 0.095;
      const total = subtotal + tax;
      state.quantity -= 1;
      state.products = state.products.filter(
        (prod) => prod._id !== action.payload._id
      );
      state.subtotal -= subtotal;
      state.taxes -= tax;
      state.total -= total;
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
