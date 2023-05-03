import { API } from "../actions/types";
import { accessDenied, apiError, apiStart, apiEnd } from "../actions/api";

const apiMiddleware = ({ dispatch }) => (next) => async (action) => {
  next(action);

  if (action.type !== API) return;

  const {
    url,
    method,
    data,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headers
  } = action.payload;

  if (label) {
    dispatch(apiStart(label));
  }

  try {
    const response = await fetch(`${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...headers
      },
      body: data ? JSON.stringify(data) : undefined
    });

    const responseData = await response.json();
    if (response.ok) {
      dispatch(onSuccess(responseData));
    } else {
      dispatch(onFailure(responseData));
      dispatch(apiError(responseData));
    }

    if (response.status === 403) {
      dispatch(accessDenied(window.location.pathname));
    }
  } catch (error) {
    dispatch(apiError(error));
  } finally {
    if (label) {
      dispatch(apiEnd(label));
    }
  }
};

export default apiMiddleware;
