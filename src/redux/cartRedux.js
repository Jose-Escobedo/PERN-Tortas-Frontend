import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    taxes: 0,
    subtotal: 0,
    total: 0,
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
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
