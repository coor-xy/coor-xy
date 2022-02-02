const SET_PRIMARY_COLUMN = "SET_PRIMARY_COLUMN";
const REMOVE_PRIMARY_COLUMN = "REMOVE_PRIMARY_COLUMN"
const SET_VALUE_COLUMNS = "SET_VALUE_COLUMNS";
const REMOVE_VALUE_COLUMN = "REMOVE_VALUE_COLUMN"
const CLEAR_ALL_VALUES = "CLEAR_ALL_VALUES"
const CHANGE_COLOR = "CHANGE_COLOR"

export const _setPrimaryColumn = (column) => ({
  type: SET_PRIMARY_COLUMN,
  column,
});

export const _removePrimaryColumn = (column) => ({
  type: REMOVE_PRIMARY_COLUMN,
  column
})

export const _setValueColumns = (columnObj) => ({
  type: SET_VALUE_COLUMNS,
  columnObj
})

export const _removeValueColumn = (columnName) => ({
  type: REMOVE_VALUE_COLUMN,
  columnName
})

export const _clearAllValues = () => ({
  type: CLEAR_ALL_VALUES
})

export const _changeColor = (columnObj) => ({
  type: CHANGE_COLOR,
  columnObj
})

const initialState = {
  primary: "",
  values: [],
};
export default function columnsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRIMARY_COLUMN:
      return { ...state, ['primary']: action.column }
    case REMOVE_PRIMARY_COLUMN:
      return { ...state, ['primary']: '' }
    case SET_VALUE_COLUMNS:
      return {...state, ['values']: [...state.values, action.columnObj]}
    case REMOVE_VALUE_COLUMN:
      return {...state, ['values']: state.values.filter(obj=>obj.name!==action.columnName)}
    case CLEAR_ALL_VALUES:
      return {...state, ['values']: []}
    case CHANGE_COLOR:{
      const stateCopy = state.values
      const idx = stateCopy.map(obj=>obj.name).indexOf(action.columnObj.name)
      stateCopy[idx]=action.columnObj
      return {...state, ['values']:stateCopy}
    }
    default:
      return state;
  }
}
