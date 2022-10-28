import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container/Container";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTypedSelector } from "../hooks/useTypedSelector";

const theme = createTheme();

export default function MyProfile(): JSX.Element {
  const { user } = useTypedSelector(({ auth }) => auth);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8 }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="80%"
              image="https://cdn-icons-png.flaticon.com/128/924/924915.png"
              alt="green iguana"
              width="auto"
            />
            {user && (
              <CardContent style={{ background: "rgba(0, 0, 0, 0.04)" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {user.name}
                </Typography>
                <hr />
                <Typography gutterBottom variant="body1" component="div">
                  Email: {user.email}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  Key: {user.key}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  Secret: {user.secret}
                </Typography>
                <Typography variant="body1">
                  About:{"  "}
                  <Typography
                    variant="body2"
                    component="span"
                    color="text.secondary"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Soluta dolore voluptate dolorum laboriosam aliquid.
                    Consequatur assumenda official officiis fugiat dicta aliquam
                    laudantium atque, enim doloremque. Nisi pariatur impedit
                    minima perspiciatis, repudiandae blanditiis, ut alias amet
                    possimus a magni ex ratione mollitia atque neque voluptate
                    adipisci consequatur temporibus? Eaque, quam sequi.
                  </Typography>
                </Typography>
              </CardContent>
            )}
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
