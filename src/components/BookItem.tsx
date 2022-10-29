import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BookActionTypes, IBookArray } from "../types/book";
import Steps from "./Steps";
import { FC } from "react";
import { LoadingButton } from "@mui/lab";
import { addBookFunc } from "../utils/addBook";

const BookItem: FC<{ book: IBookArray }> = ({ book }) => {
  const { deleteBook, addBook } = useActions();
  const { user } = useTypedSelector(({ auth }) => auth);
  const { books } = useTypedSelector(({ book }) => book);
  const dispatch = useDispatch();

  const deleteBookHandler = () => {
    if (user) {
      if (book.book.id) {
        deleteBook({
          method: "DELETE",
          endpoint: `/books/${book.book.id}`,
          body: "",
          secret: user.secret,
          key: user.key,
        });
        dispatch({
          type: BookActionTypes.GET_BOOKS,
          payload: books.filter(
            (data: IBookArray) => data.book.id !== book.book.id
          ),
        });
      } else {
        return alert("Not deleted");
      }
    }
  };

  const addBookHandler = async (isbn: string) => {
    if (user) {
      addBookFunc({ func: addBook, books, isbn, user });
    } else {
      return alert("Not Authorized");
    }
  };

  return (
    <Grid className="book_item " item sm={12} md={6}>
      {book.book.id && (
        <Button className="book_item-delete_btn" onClick={deleteBookHandler}>
          <DeleteSweepIcon />
        </Button>
      )}
      <Card sx={{ display: "flex" }} className="book_item-card">
        <CardMedia
          component="img"
          sx={{
            height: "100%",
            width: "30%",
            minWidth: 160,
            maxWidth: 180,
            objectFit: "cover",
          }}
          image={
            book.book.cover ||
            "https://www.lse.ac.uk/International-History/Images/Books/NoBookCover.png"
          }
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography
              component="div"
              variant="h6"
              className="book_item-card_title"
            >
              {book.book.title || ""}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <b>Author: </b> {book.book.author || ""}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <b>Pages: </b> {book.book.pages || ""}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <b>ISBN: </b> {book.book.isbn || ""}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <b>Published: </b> {book.book.published || ""}
            </Typography>
          </CardContent>
          {book.book.id && <Steps item={book} />}
          {!book.book.id && (
            <div>
              <LoadingButton
                // loading={loading}
                variant="contained"
                className="create-btn"
                onClick={() => addBookHandler(book.book.isbn)}
              >
                Add to my shelf
                <img
                  className="create-btn_icon"
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/medical-book-2126431-1790681.png"
                  alt="add_book"
                />
              </LoadingButton>
            </div>
          )}
        </Box>
      </Card>
    </Grid>
  );
};

export default BookItem;
