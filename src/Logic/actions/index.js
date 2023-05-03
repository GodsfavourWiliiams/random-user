import {
  SET_ARTICLE_DETAILS,
  API,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
  SET_TOTAL_PAGES,
  SET_TOTAL_RECORDS
} from "./types";
export function fetchArticleDetails(page, pageSize) {
  const url = `https://randomuser.me/api/?page=${page}&results=${pageSize}`;
  return apiAction({
    url,
    onSuccess: setArticleDetails,
    onFailure: () => console.log("Error occurred loading Users"),
    label: "FETCH_ARTICLE_DETAILS"
  });
}

function setArticleDetails({ results, info }) {
  return {
    type: SET_ARTICLE_DETAILS,
    payload: { results, info }
  };
}

export function setCurrentPage(currentPage) {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage
  };
}

export function setPageSize(pageSize) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_PAGE_SIZE,
      payload: pageSize
    });

    const { totalRecords } = getState().yourReducer;
    const totalPages = Math.ceil(totalRecords / pageSize);
    dispatch(setTotalPages(totalPages));
  };
}

export function setTotalPages(totalPages) {
  return {
    type: SET_TOTAL_PAGES,
    payload: totalPages
  };
}

export function setTotalRecords(totalRecords) {
  return {
    type: SET_TOTAL_RECORDS,
    payload: totalRecords
  };
}

function apiAction({
  url = "",
  method = "GET",
  data = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = "",
  headersOverride = null
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride
    }
  };
}
