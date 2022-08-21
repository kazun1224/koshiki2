import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { firebaseAuth } from "src/utils/firebase";

export type authUser = {
  id: string;
  email: string;
  password: string;
};

interface GenericState<T> {
  data?: T
  status: 'loading' | 'finished' | 'error'
}

const initialState: authUser = {
  id: "",
  email: "",
  password: "",
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    currentUser: (state, action: PayloadAction<authUser>) => {

      if (!action.payload) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
      }
      }
      return state;
    },
    singIn: async(state, action: PayloadAction<authUser>) => {
      return  await  signInWithEmailAndPassword(firebaseAuth, action.payload.email, action.payload.password)
      .then((userCredential: UserCredential) => {
        const { refreshToken, providerData } = userCredential.user;
        localStorage.setItem("user", JSON.stringify(providerData));
        localStorage.setItem("accessToken", JSON.stringify(refreshToken));
        // router.push(pagesPath.$url());
      })
      .catch((error) => {
        console.log(`${error.code} : ${error.message}`);
        // setSuccess(false);
      });
    },
  },
});

export const { currentUser } = counterSlice.actions;
export const authUserReducer = counterSlice.reducer;

  // redux toolkit使用例
  // const userId = useSelector((state: RootState) => state.authCurrentUser.id)
  // const dispatch = useDispatch();
  // const onClick = () => dispatch(currentUser());
