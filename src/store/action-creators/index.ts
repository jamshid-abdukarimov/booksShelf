import * as UserActionCreators from "./auth";
import * as BookActionCreators from "./book";
const ActionCreators = { ...UserActionCreators, ...BookActionCreators };

export default ActionCreators;
