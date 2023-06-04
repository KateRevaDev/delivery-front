import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goods: [
    {
      _id: "647a0ed986ddf190cce32950",
      name: "apple",
      price: {
        $numberDecimal: "15",
      },
      shopId: "6479dc22b5fbb35def5625f6",
      __v: 0,
    },
    {
      _id: "647a3d955d47d83e4475d2f9",
      name: "pare",
      price: {
        $numberDecimal: "10",
      },
      shopId: "6479dc36b5fbb35def5625f9",
      __v: 0,
    },
  ],
  shops: [
    {
      _id: "6479dc22b5fbb35def5625f6",
      name: "METRO",
      __v: 0,
    },
    {
      _id: "6479dc36b5fbb35def5625f9",
      name: "ATB",
      __v: 0,
    },
    {
      _id: "6479e7687625989e5b3c2842",
      name: "FORA",
      __v: 0,
    },
  ],
  order: {
    name: "",
    email: "",
    phone: "",
    address: "",
    goods: [],
    total: 0,
  },
  currentShop: null,
  isLoading: true,
  orderCreated: false,
};

export const mainSlice = createSlice({
  name: "mainReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const good = state.order.goods.find(
        (item) => item._id === action.payload._id
      );
      if (good) {
        state.order.goods = state.order.goods.map((item) =>
          item._id === good._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.order.goods.push({
          ...action.payload,
          quantity: 1,
        });
      }
      state.order.total = getTotalSum(state.order.goods);
    },
    removeItem: (state, action) => {
      state.order.goods = state.order.goods.filter(item => item._id !== action.payload._id);
      state.order.total = getTotalSum(state.order.goods);
    },
    updateOrderField: (state, action) => {
      if (action.payload.field === "quantity") {
        state.order.goods = state.order.goods.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.value }
            : item
        );
        state.order.total = getTotalSum(state.order.goods);
      } else {
        state.order = {
          ...state.order,
          [action.payload.field]: action.payload.value,
        };
      }
    },

    setInitialData: (state, action) => {
      state.shops = action.payload[0];
      state.goods = action.payload[1];
      state.currentShop = action.payload[0][0];
      state.isLoading = false;
    },

    setOrderCreated: (state, action) => {
      state.orderCreated = action.payload.created;
      if (action.payload.created) {
        state.order = {
          name: "",
          email: "",
          phone: "",
          address: "",
          goods: [],
          total: 0,
        };
      }
    },

    setCurrentShop: (state, action) => {
      state.currentShop = action.payload;
    },
  },
});

const getTotalSum = (goods) => {
  let total = 0;
  goods.map((item) => {
    total += Number(item.quantity) * Number(item.price?.$numberDecimal);
  });
  return total;
};

// Action creators are generated for each case reducer function
export const { addToCart, setInitialData, setCurrentShop, removeItem, setOrderCreated, updateOrderField } =
  mainSlice.actions;

export const selectGoods = (state) => {
  if (state.currentShop) {
    return state.goods.filter((item) => item.shopId === state.currentShop._id);
  }
  return state.goods;
};
export const selectOrder = (state) => state.order;
export const selectOrderCreated = (state) => state.orderCreated;
export const selectShops = (state) => state.shops;
export const selectIsLoading = (state) => state.isLoading;
export const selectCurrentShop = (state) => state.currentShop;
export const selectOrderQuantity = (state) => {
  let orderQuantity = 0;
  state.order?.goods.map(item => {
    orderQuantity += item.quantity;
  });
  return orderQuantity;
};

export default mainSlice.reducer;
