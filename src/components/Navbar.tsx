import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import generatorMd5 from "../utils/hooks/md5";
import { BASE_URL } from "../api/constants";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const { getSearchedBooks, getAllBooks } = useActions();

  const { isAuth, user } = useTypedSelector(({ auth }) => auth);

  const [search, setSearch] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const { Logout } = useActions();

  const logout = () => {
    Logout();
    setSearch("");
  };

  // debounce
  const filterRef: any = React.useRef();

  React.useEffect(() => {
    let delayTimeOutFunction: any;

    if (!filterRef.current) {
      filterRef.current = true;
    } else {
      delayTimeOutFunction = setTimeout(async () => {
        if (user) {
          const searchedSign = generatorMd5({
            method: "GET",
            url: `${BASE_URL}/books/${search}`,
            body: "",
            secret: user.secret,
          });
          if (search) {
            getSearchedBooks({ Key: user.key, Sign: searchedSign, search });
          } else {
            let sign = generatorMd5({
              method: "GET",
              url: `${BASE_URL}/books`,
              body: "",
              secret: user.secret,
            });
            getAllBooks({ Key: user.key, Sign: sign });
          }
        }
      }, 700);
    }
    return () => clearTimeout(delayTimeOutFunction);
    // eslint-disable-next-line
  }, [search]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <NavLink className="logo" to="/">
              Lavina Tech
            </NavLink>
          </Typography>
          {isAuth && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={handleChange}
              />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {isAuth ? (
            <Box
              className="navigation_links"
              // sx={{ display: { xs: "none", md: "flex" } }}
            >
              <IconButton size="large">
                <NavLink to="/profile">
                  <AccountCircle />
                </NavLink>
              </IconButton>
              <IconButton size="large">
                <NavLink to="/profile">
                  <LogoutIcon onClick={logout} />
                </NavLink>
              </IconButton>
            </Box>
          ) : (
            <div className="authorization_links">
              <NavLink to="/signup">
                <Typography variant="subtitle1" color="white">
                  Sign Up
                </Typography>
              </NavLink>
              <NavLink to="/signin">
                <Typography variant="subtitle1" color="white">
                  Sign In
                </Typography>
              </NavLink>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
