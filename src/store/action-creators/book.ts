import { BookAction, BookActionTypes, IBook } from "../../types/book";
import { Dispatch } from "redux";
import axiosInstance, { AxiosProps } from "../../api/axios";

export const getAllBooks = ({
  method,
  endpoint,
  body,
  secret,
  key,
}: AxiosProps) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: BookActionTypes.SET_LOADING, payload: true });
      axiosInstance({ method, endpoint, body, secret, key })
        .then(({ data }) =>
          dispatch({
            type: BookActionTypes.GET_BOOKS,
            payload: data.data || [],
          })
        )
        .finally(() =>
          dispatch({ type: BookActionTypes.SET_LOADING, payload: false })
        );
    } catch (e: any) {
      window.alert(e.response.data.message);
      console.clear();
    }
  };
};

export const getSearchedBooks = ({
  method,
  endpoint,
  body,
  secret,
  key,
  setLoading,
}: AxiosProps & {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      setLoading(true);
      axiosInstance({
        method,
        endpoint,
        body,
        secret,
        key,
      })
        .then(({ data }) =>
          dispatch({
            type: BookActionTypes.SEARCH_BOOKS,
            payload: data.data.map((book: IBook) => ({ book })),
          })
        )
        .finally(() => setLoading(false));
    } catch (e: any) {
      window.alert(e.response.data.message);
      console.clear();
    }
  };
};

export const deleteBook = ({
  method,
  endpoint,
  body,
  secret,
  key,
}: AxiosProps) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: BookActionTypes.SET_LOADING, payload: true });
      axiosInstance({ method, endpoint, body, secret, key }).finally(() =>
        dispatch({ type: BookActionTypes.SET_LOADING, payload: false })
      );
    } catch (e: any) {
      window.alert(e.response.data.message);
      console.clear();
    }
  };
};

export const changeBookStatus = ({
  method,
  endpoint,
  body,
  secret,
  key,
}: AxiosProps) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: BookActionTypes.SET_LOADING, payload: true });
      axiosInstance({
        method,
        endpoint,
        body,
        secret,
        key,
      }).finally(() =>
        dispatch({ type: BookActionTypes.SET_LOADING, payload: false })
      );
    } catch (e: any) {
      window.alert(e.response.data.message);
      console.clear();
    }
  };
};

export const addBook = ({
  method,
  endpoint,
  body,
  secret,
  key,
  handleClose,
}: AxiosProps & { handleClose?: () => void }) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: BookActionTypes.SET_LOADING, payload: true });
      axiosInstance({
        method,
        endpoint,
        body,
        secret,
        key,
      })
        .then(({ data }) => {
          dispatch({
            type: BookActionTypes.ADD_BOOK,
            payload: { status: 0, book: data.data },
          });
          alert("Book added successfully.");
          if (handleClose) {
            handleClose();
          }
        })
        .finally(() =>
          dispatch({ type: BookActionTypes.SET_LOADING, payload: false })
        );
    } catch (e: any) {
      window.alert(e.response.data.message);
      console.clear();
    }
  };
};
