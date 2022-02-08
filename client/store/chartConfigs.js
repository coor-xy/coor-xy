import axios from "axios"
import history from '../history'
import { _setData } from "./data"
import { _setDataId } from "./dataId"
import { _clearAllValues, _removePrimaryColumn } from "./selectColumns"

const TOKEN = "token"
const SET_CHART_CONFIGS = "SET_CHART_CONFIGS"

export const _setChartConfigs = (configs) => ({
    type: SET_CHART_CONFIGS,
    configs
})

export const putConfig = (configs, chartId) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN)
            await axios.put(`/api/charts/${chartId}`, configs,{
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
        } catch (error) {
            console.log("uh oh can't update chart configs")
        }
    }
}

export const postConfig = (configs, dataId) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN)
            await axios.post(`/api/charts/${dataId}`, configs,{
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
        } catch (error) {
            console.log("uh oh can't post new chart config")
        }
    }
}

const initialState = {
    title:'',
    width:0,
    height:0,
    xLabel:'',
    yLabel:'',
    grid:false,
    legend:false
}

export default function chartConfigs (state=initialState, action) {
    switch(action.type){
        case SET_CHART_CONFIGS:
            return action.configs
        default:
            return state
    }
}