import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useActions } from "../hooks/useActions";
import generatorMd5 from "../utils/hooks/md5";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BASE_URL } from "../api/constants";
import { useDispatch } from "react-redux";
import { BookActionTypes, IBookArray } from "../types/book";
import Steps from "./Steps";

const BookItem = ({ book }: any) => {
  const { deleteBook } = useActions();
  const { user } = useTypedSelector(({ auth }) => auth);
  const { books } = useTypedSelector(({ book }) => book);
  const dispatch = useDispatch();

  const deleteBookHandler = () => {
    if (user) {
      const sign = generatorMd5({
        method: "DELETE",
        url: `${BASE_URL}/books/${book.book.id}`,
        body: "",
        secret: user.secret,
      });
      if (book.book.id) {
        deleteBook({ Key: user.key, Sign: sign, id: book.book.id });
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
  return (
    <Grid
      item
      sm={12}
      md={6}
      style={{ minHeight: "max-content", position: "relative" }}
    >
      {book.book.id && (
        <Button
          onClick={deleteBookHandler}
          style={{ position: "absolute", top: 20, right: 5, color: "red" }}
        >
          <DeleteSweepIcon />
        </Button>
      )}
      <Card sx={{ display: "flex" }} style={{ height: "100%" }}>
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
              style={{ lineHeight: 1.2, marginBottom: 20 }}
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
        </Box>
      </Card>
    </Grid>
  );
};

export default BookItem;
