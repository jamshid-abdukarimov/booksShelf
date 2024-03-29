import { IUser } from "../types/auth";
import { IBookArray } from "../types/book";

interface AddBookFuncProps {
  func: Function;
  books: IBookArray[];
  isbn: string;
  user: IUser;
  handleClose?: () => void;
}

export const addBookFunc = ({
  func,
  books,
  isbn,
  user,
  handleClose,
}: AddBookFuncProps) => {
  let canAdd = true;
  books.forEach((book: IBookArray) => {
    if (book.book.isbn === isbn) {
      canAdd = false;
      return alert("You have this book on your shelf");
    }
  });

  if (canAdd) {
    if (isbn && isbn.length >= 10) {
      func({
        method: "POST",
        endpoint: "/books",
        body: JSON.stringify({ isbn }),
        secret: user.secret,
        key: user.key,
        handleClose,
      });
      return;
    } else {
      return alert("No books found for this isbn.");
    }
  }
  canAdd = true;
};
