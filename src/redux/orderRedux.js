import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    products: [],
    quantity: 0,
    taxes: 0,
    tip: 0,
    subtotal: 0,
    delivery: 4.99,
    total: 4.99,
  },
  reducers: {
    addOrder: (state, action) => {
      const subtotal = action.payload.price * action.payload.quantity;
      const tax = subtotal * 0.095;
      const total = subtotal + tax;
      const item = state.products.find((i) => i.name === action.payload.name);

      if (item) {
        item.quantity += action.payload.quantity;
        state.quantity += 1;
        state.subtotal += subtotal;
        state.taxes += tax;
        state.total += total;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.subtotal += subtotal;
        state.taxes += tax;
        state.total += total;
      }
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
