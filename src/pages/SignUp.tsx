import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormEvent, useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const theme = createTheme();

export default function SignUp() {
  const { SignUp } = useActions();
  const { isAuth, loading } = useTypedSelector(({ auth }) => auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) return navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const key = data.get("key");
    const secret = data.get("secret");
    const newData = {
      name: `${name}`,
      email: `${email}`,
      key: `${key}`,
      secret: `${secret}`,
    };
    SignUp(newData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="key"
              label="Key"
              type="password"
              id="key"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="secret"
              label="Secret"
              type="password"
              id="secret"
            />
            <LoadingButton
              loading={loading}
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
