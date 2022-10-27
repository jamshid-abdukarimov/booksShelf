import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BookActionTypes, IBookArray } from "../types/book";
import axios from "axios";
import { BASE_URL } from "../api/constants";
import { useTypedSelector } from "../hooks/useTypedSelector";
import generatorMd5 from "../utils/hooks/md5";
import { useDispatch } from "react-redux";
import { useActions } from "../hooks/useActions";

const steps = ["New", "Reading", "Finished"];

export default function Steps({ item }: any) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const { user } = useTypedSelector(({ auth }) => auth);
  const { books } = useTypedSelector(({ book }) => book);
  const dispatch = useDispatch();
  const { changeBookStatus } = useActions();

  // const isStepOptional = (step: number) => {
  //   return step === 1;
  // };

  // const isStepSkipped = (step: number) => {
  //   return skipped.has(step);
  // };

  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(item.status)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleSkip = () => {
  //   if (!isStepOptional(item.status)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(item.status);
  //     return newSkipped;
  //   });
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const handlePatch = async (status: number) => {
    if (user) {
      const sign = generatorMd5({
        method: "PATCH",
        url: `${BASE_URL}/books/${item.book.id}`,
        body: JSON.stringify({ status }),
        secret: user.secret,
      });

      changeBookStatus({ Key: user.key, Sign: sign, id: item.book.id, status });
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
      <Stepper
        style={{ display: "flex", marginBottom: 20 }}
        activeStep={item.status}
      >
        {steps.map((label, status) => {
          // const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step
              onClick={() => handlePatch(status)}
              style={{ alignSelf: "flex-start", cursor: "pointer" }}
              key={label}
              // {...stepProps}
            >
              <StepLabel
                style={{ display: "flex", flexDirection: "column" }}
                {...labelProps}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* {true ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Status {item.status + 1}
          </Typography>
          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box> */}
      {/* </React.Fragment> */}
    </Box>
  );
}
