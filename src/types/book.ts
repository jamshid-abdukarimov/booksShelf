export type IBook = {
  author: string;
  cover: string;
  id: number;
  isbn: string;
  pages: number;
  published: number;
  title: string;
};

export interface IBookArray {
  book: IBook;
  status: number;
}

export enum BookActionTypes {
  SET_ISBN = "SET_ISBN",
  GET_BOOKS = "GET_BOOKS",
  SET_LOADING = "SET_LOADING",
  ADD_BOOK = "ADD_BOOK",
  SEARCH_BOOKS = "SEARCH_BOOKS",
}
interface SET_LOADING_ACTION {
  type: BookActionTypes.SET_LOADING;
  payload: boolean;
}

interface SET_ISBN_ACTION {
  type: BookActionTypes.SET_ISBN;
  payload: string;
}

interface GET_BOOKS_ACTION {
  type: BookActionTypes.GET_BOOKS;
  payload: IBookArray[];
}

interface ADD_BOOK_ACTION {
  type: BookActionTypes.ADD_BOOK;
  payload: IBookArray;
}

interface SEARCH_BOOKS_ACTION {
  type: BookActionTypes.SEARCH_BOOKS;
  payload: IBookArray[];
}

export type BookAction =
  | SET_ISBN_ACTION
  | GET_BOOKS_ACTION
  | SET_LOADING_ACTION
  | ADD_BOOK_ACTION
  | SEARCH_BOOKS_ACTION;
