import { IUser, UserAction, UserActionTypes } from "../../types/auth";
import { Dispatch } from "redux";
import axios from "axios";
import { BASE_URL } from "../../api/constants";
import { BookAction, BookActionTypes } from "../../types/book";

export const SignUp = (data: IUser) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.SET_LOADING, payload: true });
      await axios
        .post(`${BASE_URL}/signup`, data)
        .then(({ data }) => {
          dispatch({
            type: UserActionTypes.FETCH_USER,
            payload: data.data,
          });
        })
        .finally(() =>
          dispatch({ type: UserActionTypes.SET_LOADING, payload: false })
        );
    } catch (e: any) {
      window.alert(e.response.data.message);
      console.clear();
    }
  };
};

export const SignIn = (data: any) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.SET_LOADING, payload: true });
      await axios
        .get(`${BASE_URL}/myself`, { headers: data })
        .then(({ data }) => {
          dispatch({
            type: UserActionTypes.FETCH_USER,
            payload: data.data,
          });
        })
        .finally(() =>
          dispatch({ type: UserActionTypes.SET_LOADING, payload: false })
        );
    } catch (e: any) {
      window.alert(e.response.data.message);
      console.clear();
    }
  };
};

export const Logout = () => (dispatch: Dispatch<UserAction | BookAction>) => {
  dispatch({ type: UserActionTypes.RESET });
  dispatch({ type: BookActionTypes.GET_BOOKS, payload: [] });
};

export const SetLoading =
  (payload: boolean) => async (dispatch: Dispatch<UserAction>) =>
    dispatch({ type: UserActionTypes.SET_LOADING, payload });
