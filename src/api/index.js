import axios from "axios";

const fetchData = ({ errorExplanation }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8443/langChain",
        errorExplanation,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "FETCH_SUCCESS",
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default fetchData;
