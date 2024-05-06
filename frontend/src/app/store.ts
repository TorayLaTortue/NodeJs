import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { PouletCroquant, SuperCremeux } from "../common/models";

interface RootState {
  value: null | any; // Adjust 'any' to match the type you expect for value
  owner: Record<string, any>; // Adjust 'any' to match the type you expect for owner
  list: (typeof SuperCremeux | typeof PouletCroquant)[];
}

const initialState: RootState = {
  value: null,
  owner: {},
  list: [SuperCremeux, PouletCroquant],
};

// Define actions
const addProduct = createAction<typeof SuperCremeux | typeof PouletCroquant>("ADD_PRODUCT");
const removeProduct = createAction<number>("REMOVE_PRODUCT");
const applyVoucher = createAction<{ price: number }>("APPLY_VOUCHER");
const updateFirstName = createAction<string>("UPDATE_FIRSTNAME");

// Define reducer
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addProduct, (state, action) => {
      state.list.push(action.payload);
    })
    .addCase(removeProduct, (state, action) => {
      state.list.splice(action.payload, 1);
    })
    .addCase(applyVoucher, (state, action) => {
      state.list.forEach((item) => {
        if (item.title === "Super Crémeux") {
          item.price = action.payload.price;
        }
      });
    })
    .addCase(updateFirstName, (state, action) => {
      state.owner.firstName = action.payload;
    });
});

export const store = configureStore({
  preloadedState: initialState,
  reducer,
});

export { addProduct, removeProduct, applyVoucher, updateFirstName };
