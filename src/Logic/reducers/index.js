import {
  SET_ARTICLE_DETAILS,
  API_START,
  API_END,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
  SET_TOTAL_PAGES
} from "../actions/types";

const initialState = {
  data: [],
  isLoadingData: false,
  currentPage: 1,
  totalItems: 50,
  totalPages: null,
  pageSize: 10
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ARTICLE_DETAILS:
      const { results, info } = action.payload;
      const { page, results: totalItems } = info;

      return {
        ...state,
        data: results,
        currentPage: page,
        totalPages: Math.ceil(totalItems / 10)
      };
    case API_START:
      return {
        ...state,
        isLoadingData: true
      };
    case API_END:
      return {
        ...state,
        isLoadingData: false
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
        totalPages: Math.ceil(state.totalItems / action.payload)
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload
      };
    default:
      return state;
  }
}
