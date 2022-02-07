import axios from 'axios'

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

export default function allCharts (state=[],action) {
    switch(action.type){
        case GOT_CHARTS:
            return action.charts
        default:
            return state
    }
}
