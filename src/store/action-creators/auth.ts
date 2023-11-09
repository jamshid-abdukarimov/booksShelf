import { IUser, UserAction, UserActionTypes } from "../../types/auth";
import { Dispatch } from "redux";
import axios from "axios";
import { BASE_URL } from "../../api/constants";
import { BookAction, BookActionTypes } from "../../types/book";
import generatorMd5 from "../../utils/md5";
import { NavigateFunction } from "react-router-dom";

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

export const SignIn = (data: { secret: string; key: string }) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const sign = generatorMd5({
        method: "GET",
        url: "/myself",
        body: "",
        secret: `${data.secret}`,
      });
      dispatch({ type: UserActionTypes.SET_LOADING, payload: true });
      await axios
        .get(`${BASE_URL}/myself`, {
          headers: {
            key: data.key,
            sign: sign,
          },
        })
        .then(({ data: res }) => {
          dispatch({
            type: UserActionTypes.FETCH_USER,
            payload: res.data,
          });
          localStorage.setItem(
            "userData",
            JSON.stringify({
              key: data.key,
              secret: data.secret,
            })
          );
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
