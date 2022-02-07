import axios from 'axios';
const TOKEN = 'token';

const SET_DATA_DB = 'SET_DATA_DB';

const _setDataDB = (data) => ({ type: SET_DATA_DB, data });

export const fetchDataDB = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get('api/data', {
          headers: {
            authorization: token,
          },
        });
        dispatch(_setDataDB(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default function dataDBReducer(state = [], action) {
  switch (action.type) {
    case SET_DATA_DB:
      return action.data;
    default:
      return state;
  }
}
