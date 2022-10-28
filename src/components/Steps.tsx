import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { BookActionTypes } from "../types/book";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { useActions } from "../hooks/useActions";

const steps = ["New", "Reading", "Finished"];

export default function Steps({ item }: any) {
  const { user } = useTypedSelector(({ auth }) => auth);
  const { books } = useTypedSelector(({ book }) => book);
  const dispatch = useDispatch();
  const { changeBookStatus } = useActions();

  const handlePatch = async (status: number) => {
    if (user) {
      changeBookStatus({
        method: "PATCH",
        endpoint: `/books/${item.book.id}`,
        body: JSON.stringify({ status }),
        secret: user.secret,
        key: user.key,
      });
      let newBooks = books.map((book) => {
        if (book.book.id === item.book.id) {
          let newBook = { ...book, status };
          return newBook;
        }
        return book;
      });
      dispatch({ type: BookActionTypes.GET_BOOKS, payload: newBooks });
    }
  };

  return (
    <Box paddingX={"20px"} sx={{ width: "95%" }}>
      <Stepper className="steps" activeStep={item.status}>
        {steps.map((label, status) => {
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step
              className="step"
              onClick={() => handlePatch(status)}
              key={label}
            >
              <StepLabel className="step_item" {...labelProps}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
