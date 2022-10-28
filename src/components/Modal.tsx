import React, { FC } from "react";
import { Box, Button, Input, Typography, Modal } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

type ModalProps = {
  open: boolean;
  setOpen: Function;
};

const ModalComponent: FC<ModalProps> = ({ open, setOpen }) => {
  const [isbn, setIsbn] = React.useState("");
  const handleClose = () => setOpen(false);
  const { addBook } = useActions();
  const { user, loading } = useTypedSelector(({ auth }) => auth);

  const addBookHandler = async () => {
    if (isbn && isbn.length >= 10) {
      if (user) {
        addBook({
          method: "POST",
          endpoint: "/books",
          body: JSON.stringify({ isbn }),
          secret: user.secret,
          key: user.key,
        });
      }
      handleClose();
      setIsbn("");
    } else {
      return alert("Please input isbn of book correctly");
    }
  };

  return (
    <Modal
      className="modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal_content">
        <div className="modal_content-header">
          <Typography color="primary.main" id="modal-modal-title" variant="h6">
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
        <div className="modal_btn">
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
  );
};

export default ModalComponent;
