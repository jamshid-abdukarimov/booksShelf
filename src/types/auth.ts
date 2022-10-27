export interface IUser {
  name: string;
  email: string;
  key: string;
  secret: string;
}

export enum UserActionTypes {
  FETCH_USER = "FETCH_USER",
  SET_LOADING = "SET_LOADING",
  RESET = "RESET",
}

interface SET_LOADING_ACTION {
  type: UserActionTypes.SET_LOADING;
  payload: boolean;
}
interface FETCH_USER_ACTION {
  type: UserActionTypes.FETCH_USER;
  payload: IUser;
}

interface RESET_ACTION {
  type: UserActionTypes.RESET;
}

export type UserAction = SET_LOADING_ACTION | FETCH_USER_ACTION | RESET_ACTION;
