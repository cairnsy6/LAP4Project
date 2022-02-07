import jwt_decode from "jwt-decode";

export const login = (token) => {
  return async (dispatch) => {
    try {
      const user = await jwt_decode(token);
      localStorage.setItem("token", token);
      dispatch({
        type: "LOG_IN",
        payload: user,
      });
    } catch (error) {
      console.warn(`${error}`);
      dispatch({
        type: "ERROR",
        payload: error,
      });
    }
  };
};

export const requestLogin = (userData) => {
  return async (dispatch) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      };

      const response = await fetch(`http://test-django-34.herokuapp.com/users`);
      const data = await response.json();

      //error handling
      if (!data.success) {
        dispatch({
          type: "ERROR",
          payload: "Login not authorised",
        });
      } else {
        dispatch(login(data.token));
      }
    } catch (error) {
      console.warn(`${error}`);
      dispatch({
        type: "ERROR",
        payload: error,
      });
    }
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: "LOG_OUT",
  };
};
