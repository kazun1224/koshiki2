import { createSlice } from "@reduxjs/toolkit";

export type authUser = {
  id: string;
  email: string;
  password: string;
};

const initialState: authUser = {
  id: "",
  email: "",
  password: "",
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    currentUser: (state) => {
      return state;
    },
  },
});

export const { currentUser } = counterSlice.actions;
export const authUserReducer = counterSlice.reducer;

// useEffect(()=> {
//   const unsubscribed = firebaseAuth.onAuthStateChanged((user) => {
//     setUser(user);
//   });
//   return () => {
//     unsubscribed();
//   };
// })
