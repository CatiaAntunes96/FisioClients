const AuthReducer = (state = {}, actions) => {
    switch (actions.type) {
      case "SET_LOGIN":
        return { ...state, loggedIn: true, user: actions.payload };
      case "SET_LOGOUT":
        return { ...state, loggedIn: false, user: {} };
      case "UPDATE":
        return {...state, loggedIn: true, user: actions.payload };
      default:
        return state;
    }
  };
  
  export default AuthReducer;