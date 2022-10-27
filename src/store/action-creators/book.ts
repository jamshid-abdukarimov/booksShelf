import { BookAction, BookActionTypes, IBook } from "../../types/book";
import { Dispatch } from "redux";
import axios from "axios";
import { BASE_URL } from "../../api/constants";

interface getAllBooksProps {
  Key: string;
  Sign: string;
}

interface addBookProps {
  Key: string;
  Sign: string;
  isbn: string;
}

interface getSearchedBooksProps {
  Key: string;
  Sign: string;
  search: string;
}

interface deleteBookProps {
  Key: string;
  Sign: string;
  id: number;
}

interface changeBookStatusProps {
  Key: string;
  Sign: string;
  id: number;
  status: number;
}

export const getAllBooks = ({ Key, Sign }: getAllBooksProps) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: BookActionTypes.SET_LOADING, payload: true });
      await axios({
        method: "GET",
        url: `${BASE_URL}/books`,
        headers: {
          Key,
          Sign,
        },
      })
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
  Key,
  Sign,
  search,
}: getSearchedBooksProps) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: BookActionTypes.SET_LOADING, payload: true });
      await axios
        .get(`${BASE_URL}/books/${search}`, {
          headers: {
            Key,
            Sign,
          },
        })
        .then(({ data }) =>
          dispatch({
            type: BookActionTypes.GET_BOOKS,
            payload: data.data.map((book: IBook) => ({ book })),
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

export const deleteBook = ({ Key, Sign, id }: deleteBookProps) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: BookActionTypes.SET_LOADING, payload: true });
      await axios
        .get(`${BASE_URL}/books/${id}`, {
          headers: {
            Key,
            Sign,
          },
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

export const changeBookStatus = ({
  Key,
  Sign,
  id,
  status,
}: changeBookStatusProps) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: BookActionTypes.SET_LOADING, payload: true });
      await axios
        .patch(
          `${BASE_URL}/books/${id}`,
          { status },
          {
            headers: {
              Key,
              Sign,
            },
          }
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

export const addBook = ({ Key, Sign, isbn }: addBookProps) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: BookActionTypes.SET_LOADING, payload: true });
      await axios
        .post(
          `${BASE_URL}/books`,
          {
            isbn,
          },
          {
            headers: {
              Key,
              Sign,
            },
          }
        )
        .then(({ data }) =>
          dispatch({
            type: BookActionTypes.ADD_BOOK,
            payload: { status: 0, book: data.data },
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
