import { URL } from "../../serverUrl";

export const login = user => {
	return async dispatch => {
		try {
			dispatch({
				type: "LOG_IN",
				payload: user
			});
		} catch (error) {
			console.warn(`${error}`);
			dispatch({
				type: "ERROR",
				payload: error
			});
		}
	};
};

export const logout = () => {
	localStorage.clear();
	return {
		type: "LOG_OUT"
	};
};
