const SET_SELECTED_COLUMNS = "SET_SELECTED_COLUMNS";

export const _setSelectedColumns = (columns) => ({
  type: SET_SELECTED_COLUMNS,
  columns,
});

const initialState = {
  primary: "",
  values: [],
};
export default function columnsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_COLUMNS:
      return action.columns;
    default:
      return state;
  }
}
