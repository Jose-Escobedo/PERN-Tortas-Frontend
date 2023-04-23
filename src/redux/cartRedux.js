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
    totalWithTip: 4.99,
  },
  reducers: {
    addProduct: (state, action) => {
      const subtotal = action.payload.price * action.payload.quantity;
      const tax = subtotal * 0.095;
      const total = subtotal + tax;
      const item = state.products.find(
        (i, index) => index === action.payload._id
      );

      if (item) {
        item.quantity += action.payload.quantity;
        state.quantity += 1;
        state.products.push(action.payload);
        state.subtotal += subtotal;
        state.taxes += tax;
        state.total += total;
      } else {
        state.quantity += action.payload.quantity;
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
        (prod, i) => i !== action.payload._id
      );
      state.subtotal -= subtotal;
      state.taxes -= tax;
      state.total -= total;
    },
    incrementQuantity: (state, action) => {
      const subtotal = action.payload.price * action.payload.quantity;
      const tax = subtotal * 0.095;
      const total = subtotal + tax;
      const item = state.products.find(
        (i, index) => index === action.payload._id
      );

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
      const item = state.products.find(
        (i, index) => index === action.payload._id
      );
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
      } else if (item.quantity === 1) {
        state.products = state.products.filter(
          (prod, index) => index !== action.payload._id
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
      state.tip = tip;
    },
    setTotal: (state, action) => {
      // const finalizeTotal = state.total + state.tip;
      const finalizeTotal = action.payload;
      state.totalWithTip = finalizeTotal;
    },
    clearCart: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.taxes = 0;
      state.tip = 0;
      state.subtotal = 0;
      state.delivery = 4.99;
      state.total = 4.99;
      state.totalWithTip = 4.99;
    },
    addOrRemoveExtras: (state, action) => {},
  },
});

export const {
  addProduct,
  removeProduct,
  decrementQuantity,
  incrementQuantity,
  addTip,
  setTotal,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
