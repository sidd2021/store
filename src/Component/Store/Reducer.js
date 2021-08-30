import * as actionTypes from "../Store/action";
const initialLogin = {
  login: false,
  currentUser: "",
};
export const login = (state = initialLogin, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, login: action.login };
    case actionTypes.CURRENTUSER:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    default:
      return state;
  }
};
const initActive = {
  currentChannel: "",
};
export const activeChannel = (state = initActive, action) => {
  switch (action.type) {
    case actionTypes.ACTIVE_CHANNEL:
      return action.activeChannel;
    default:
      return state;
  }
};
