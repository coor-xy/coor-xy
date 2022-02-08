import axios from 'axios'

const GOT_SINGLE_CHART = "GOT_SINGLE_CHART"

const got_single_chart = (chart) => ({
  type: GOT_SINGLE_CHART,
  chart
})

export const fetchSingleChart = (id) => {
  return async (dispatch) => {

      const {data} = await axios.get(`/api/share/${id}`)
      dispatch(got_single_chart(data))
  }
}

export default function singleChart (state={},action) {
  switch(action.type){
      case GOT_SINGLE_CHART:
          return action.chart
      default:
          return state
  }
}
