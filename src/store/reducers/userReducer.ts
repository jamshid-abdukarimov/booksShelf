import { IUser, UserAction, UserActionTypes } from "../../types/auth";

interface UserState {
  user: null | IUser;
  loading: boolean;
  error: null | string;
  isAuth: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case UserActionTypes.FETCH_USER:
      return { ...state, user: action.payload, loading: false, isAuth: true };
    case UserActionTypes.RESET:
      return { ...state, user: null, isAuth: false };
    default:
      return state;
  }
};
