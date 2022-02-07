import axios from 'axios'
import history from '../history'
import { _setChartConfigs } from './chartConfigs'
import { _setData } from './data'
import { _setDataId } from './dataId'
import { _clearAllValues, _removePrimaryColumn } from './selectColumns'

const TOKEN = 'token'
const GOT_CHARTS = "GOT_CHARTS"

const got_charts = (charts) => ({
    type: GOT_CHARTS,
    charts
})

export const fetchCharts = () => {
    return async (dispatch) => {
        const token = window.localStorage.getItem(TOKEN)
        const {data} = await axios.get('/api/charts',{
            headers: {
              authorization: token,
            }
          })
        dispatch(got_charts(data))
    }
}

export const removeChart = (chartId) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem(TOKEN)
        await axios.delete(`/api/charts/${chartId}`,{
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

export default function allCharts (state=[],action) {
    switch(action.type){
        case GOT_CHARTS:
            return action.charts
        default:
            return state
    }
}