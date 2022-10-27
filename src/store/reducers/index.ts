import { combineReducers } from "redux";
import { bookReducer } from "./bookReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  auth: userReducer,
  book: bookReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
