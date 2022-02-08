const initState = {
  isLoggedIn: true,
  currentUser: { id: 1, username: "Bethan" },
  error: "",
};

const loggingReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.payload,
        error: "",
      };
    case "LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        currentUser: {},
        error: "",
      };
    case "ERROR":
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        currentUser: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loggingReducer;
