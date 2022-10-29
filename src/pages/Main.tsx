import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

import BookItem from "../components/BookItem";
import Modal from "../components/Modal";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IBookArray } from "../types/book";

const Main: FC = () => {
  const [open, setOpen] = React.useState(false);
  const { isAuth, user } = useTypedSelector(({ auth }) => auth);
  const { books, searchedBooks } = useTypedSelector(({ book }) => book);
  const navigate = useNavigate();
  const { getAllBooks } = useActions();

  const handleOpen = () => setOpen(true);

  const fetchAllBooks = () => {
    if (user) {
      getAllBooks({
        method: "GET",
        endpoint: "/books",
        body: "",
        secret: user.secret,
        key: user.key,
      });
    }
  };

  React.useEffect(() => {
    if (isAuth && books && !books.length) {
      fetchAllBooks();
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    !isAuth && navigate("/signup");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className="home">
      <div className="home_modal">
        <Modal open={open} setOpen={setOpen} />
      </div>
      <Button onClick={handleOpen} variant="contained" className="create-btn">
        Add a Book
        <img
          className="create-btn_icon"
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/medical-book-2126431-1790681.png"
          alt="add_book"
        />
      </Button>
      {/* <CreateBookModal isOpen={isActive} setIsOpen={setIsActive} /> */}
      <div>
        <Grid padding="0 15px" container spacing={2}>
          {searchedBooks.length ? (
            searchedBooks.map((book: IBookArray, index: number) => (
              <BookItem key={`${Math.random}_${index}`} book={book} />
            ))
          ) : books && books.length ? (
            books?.map((book: IBookArray, index) => (
              <BookItem key={`${Math.random}_${index}`} book={book} />
            ))
          ) : (
            <Typography
              variant="h4"
              textAlign="center"
              marginTop={3}
              width="100%"
              color="primary.main"
            >
              No Books. Please, Initially add a new book.
            </Typography>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Main;
