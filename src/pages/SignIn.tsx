import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormEvent, useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import generatorMd5 from "../utils/md5";
import { useActions } from "../hooks/useActions";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function SignIn(): JSX.Element {
  const { loading, isAuth } = useTypedSelector(({ auth }) => auth);
  const { SignIn } = useActions();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const key = formData.get("key");
    const secret = formData.get("secret");
    const sign = generatorMd5({
      method: "GET",
      url: "https://23v112.lavina.tech/myself",
      body: "",
      secret: `${secret}`,
    });

    const data = {
      Key: `${key}`,
      Sign: `${sign}`,
    };
    SignIn(data);
  };

  useEffect(() => {
    if (isAuth) return navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

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
            Sign In
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
              name="key"
              label="Key"
              type="password"
              id="key"
              autoFocus
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
              Sign In
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
