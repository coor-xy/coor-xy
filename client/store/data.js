
const SET_DATA = 'SET_DATA';

export const _setData = data => ({type: SET_DATA, data})

export default function dataReducer(state = [], action) {
    switch (action.type) {
        case SET_DATA:
            return action.data;
        default:
            return state;
    }
}