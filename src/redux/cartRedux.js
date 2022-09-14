import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
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
    addProduct: (state, action) => {
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
    removeProduct: (state, action) => {
      const subtotal = action.payload.price * action.payload.quantity;
      const tax = subtotal * 0.095;
      const total = subtotal + tax;
      state.quantity -= action.payload.quantity;
      state.products = state.products.filter(
        (prod) => prod._id !== action.payload._id
      );
      state.subtotal -= subtotal;
      state.taxes -= tax;
      state.total -= total;
    },
    incrementQuantity: (state, action) => {
      const subtotal = action.payload.price * action.payload.quantity;
      const tax = subtotal * 0.095;
      const total = subtotal + tax;
      const item = state.products.find((i) => i.name === action.payload.name);

      if (item) {
        const subtotalItem = action.payload.price;
        const taxItem = subtotalItem * 0.095;
        const totalItem = subtotalItem + taxItem;
        item.quantity += 1;
        state.quantity += 1;
        state.subtotal = state.subtotal + subtotalItem;
        state.taxes = state.taxes + taxItem;
        state.total = state.total + totalItem;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((i) => i.name === action.payload.name);
      const subtotal = action.payload.price * action.payload.quantity;
      const tax = subtotal * 0.095;
      const total = subtotal + tax;

      if (item.quantity > 1) {
        const subtotalItem = action.payload.price;
        const taxItem = subtotalItem * 0.095;
        const totalItem = subtotalItem + taxItem;
        item.quantity -= 1;
        state.quantity -= 1;
        state.subtotal = state.subtotal - subtotalItem;
        state.taxes = state.taxes - taxItem;
        state.total = state.total - totalItem;
      } else if (item.quantity == 1) {
        state.products = state.products.filter(
          (prod) => prod._id !== action.payload._id
        );
        item.quantity -= 1;
        state.quantity -= 1;
        state.subtotal -= subtotal;
        state.taxes -= tax;
        state.total -= total;
      }
    },
    addTip: (state, action) => {
      const tip = action.payload;
      const total = state.total
      state.tip = tip;
      state.total = state.total + state.tip;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  decrementQuantity,
  incrementQuantity,
  addTip,
} = cartSlice.actions;
export default cartSlice.reducer;
