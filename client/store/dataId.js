const SET_DATA_ID = 'SET_DATA_ID';

export const _setDataId = dataId => ({type: SET_DATA_ID, dataId})

export default function dataIdReducer(state = 0, action) {
    switch (action.type) {
        case SET_DATA_ID:
            return action.dataId;
        default:
            return state;
    }
}