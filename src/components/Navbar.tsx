import React, { FC } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";

import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import SearchComponent from "./SearchComponent";

const Navbar: FC = () => {
  const { isAuth } = useTypedSelector(({ auth }) => auth);
  const { Logout } = useActions();

  const [search, setSearch] = React.useState("");

  const logout = () => {
    Logout();
    setSearch("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <NavLink className="logo" to="/">
              Lavina Tech
            </NavLink>
          </Typography>
          {isAuth && <SearchComponent search={search} setSearch={setSearch} />}
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
};

export default Navbar;
