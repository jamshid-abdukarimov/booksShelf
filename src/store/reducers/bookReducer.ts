import { BookActionTypes, IBookArray, BookAction } from "../../types/book";

interface BookState {
  isbn: string;
  books: IBookArray[];
  searchedBooks: IBookArray[];
}

const initialState: BookState = {
  isbn: "",
  books: [] as IBookArray[],
  searchedBooks: [] as IBookArray[],
};

export const bookReducer = (
  state = initialState,
  action: BookAction
): BookState => {
  switch (action.type) {
    case BookActionTypes.SET_ISBN:
      return { ...state, isbn: action.payload };
    case BookActionTypes.GET_BOOKS:
      return { ...state, books: action.payload };
    case BookActionTypes.SEARCH_BOOKS:
      return { ...state, searchedBooks: action.payload };
    case BookActionTypes.ADD_BOOK:
      return { ...state, books: [...state.books, action.payload] };
    default:
      return state;
  }
};
