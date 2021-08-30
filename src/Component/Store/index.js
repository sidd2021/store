export const loginHandler = (action) => {
  return {
    type: action.type,
    login: action.login,
  };
};

export const currentUser = (action) => {
  console.log(action);
  return {
    type: action.type,
    currentUser: action.currentUser,
  };
};
