export default (state = { errorExplanation: null }, action) => {
  const { type, data } = action;
  switch (type) {
    case "FETCH_SUCCESS":
      return { errorExplanation: data };
    case "FETCH_FAILED":
      return { errorExplanation: null };
    default:
      return state;
  }
};
