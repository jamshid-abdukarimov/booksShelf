import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Box, Button, Grid, Input, Modal, Typography } from "@mui/material";

import axios from "axios";
import { BASE_URL } from "../api/constants";
import generatorMd5 from "../utils/hooks/md5";
import { LoadingButton } from "@mui/lab";
import { useActions } from "../hooks/useActions";
import BookItem from "../components/BookItem";
const Main = () => {
  const { isAuth, user, loading } = useTypedSelector(({ auth }) => auth);
  const navigate = useNavigate();
  const { books } = useTypedSelector(({ book }) => book);
  const { getAllBooks, addBook } = useActions();

  const [open, setOpen] = React.useState(false);
  const [isbn, setIsbn] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchAllBooks = () => {
    if (user) {
      const sign = generatorMd5({
        method: "GET",
        url: `${BASE_URL}/books`,
        body: "",
        secret: user.secret,
      });

      sign && getAllBooks({ Key: user.key, Sign: sign });
    }
  };

  useEffect(() => {
    if (isAuth && books && !books.length) {
      fetchAllBooks();
    }
  }, []);

  const addBookHandler = async () => {
    if (isbn && isbn.length >= 10) {
      if (user) {
        const sign = generatorMd5({
          method: "POST",
          url: `${BASE_URL}/books`,
          body: JSON.stringify({ isbn }),
          secret: user.secret,
        });

        sign && addBook({ Key: user?.key, Sign: sign, isbn });
      }
      handleClose();
    } else {
      return alert("Please input isbn of book correctly");
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    !isAuth && navigate("/signup");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);
  console.log(books);
  return (
    <div className="home">
      <div className="home_modal">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                color="primary.main"
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Create a new book
              </Typography>
              <Button
                onClick={handleClose}
                className="DocSearch-Hit-action-button"
                title="Remove this search from history"
                type="submit"
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path
                    d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                    stroke="currentColor"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fontWeight={900}
                  ></path>
                </svg>
              </Button>
            </div>
            <Input
              type="number"
              placeholder="Input the book isbn"
              fullWidth
              autoFocus
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <LoadingButton
                loading={loading}
                onClick={addBookHandler}
                variant="contained"
              >
                Create
              </LoadingButton>
            </div>
          </Box>
        </Modal>
      </div>
      <Button
        onClick={handleOpen}
        style={{ margin: 15 }}
        variant="contained"
        className="create-btn"
      >
        Add Book
        <img
          style={{ width: 30, marginLeft: 15 }}
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/medical-book-2126431-1790681.png"
          alt="add_book"
        />
      </Button>
      {/* <CreateBookModal isOpen={isActive} setIsOpen={setIsActive} /> */}
      <div>
        <Grid padding="0 15px" container spacing={2}>
          {books && books.length ? (
            books?.map((book, index) => (
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
