import axios from "axios"
import history from '../history'
import { _setChartConfigs } from "./chartConfigs";
import { _setDataId } from "./dataId";
import { _clearAllValues, _removePrimaryColumn } from "./selectColumns";

const TOKEN = 'token'
const SET_DATA = 'SET_DATA';

export const _setData = data => ({type: SET_DATA, data})

export const postData = (data, config) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem(TOKEN)
        await axios.post('/api/data', {data, config}, {
            headers: {
              authorization: token,
            }
        })
        dispatch(_setData([]));
        dispatch(_setDataId(0))
        dispatch(_removePrimaryColumn(''))
        dispatch(_clearAllValues())
        dispatch(_setChartConfigs({
            title:'',
            width:0,
            height:0,
            xLabel:'',
            yLabel:'',
            grid:false,
            legend:false
        }))
        history.push('/mycharts')
    }
}

export default function dataReducer(state = [], action) {
    switch (action.type) {
        case SET_DATA:
            return action.data;
        default:
            return state;
    }
}