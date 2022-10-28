import React, { FC } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import generatorMd5 from "../utils/md5";
import { BASE_URL } from "../api/constants";

type SearchComponentProps = {
  search: string;
  setSearch: Function;
};

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

const SearchComponent: FC<SearchComponentProps> = ({ search, setSearch }) => {
  const { getSearchedBooks, getAllBooks } = useActions();
  const { user } = useTypedSelector(({ auth }) => auth);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
  return (
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
  );
};

export default SearchComponent;
