import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleChart } from '../store/singleChart'
import {useParams} from 'react-router-dom'
import charts from "./chartComponents";

const { BarComp, SimpleAreaComp, SimpleScatterComp, LineComp } = charts;

const ShareableUrl = () => {
 const dispatch = useDispatch()
 const {id, data, type, primaryColumn, width, height, xLabel, yLabel, title, grid, legend, valueColumns} = useParams()
 useEffect(() => {
  dispatch(fetchSingleChart(id))
 }, [])

  return (
    <div>
      <h1>Shareable Page #{id}</h1>
      <div>
      {type === "Bar" && (
        <BarComp
          data={data}
          primaryColumn={primaryColumn}
          valueColumns={valueColumns}
          width={width}
          height={height}
          xLabel={xLabel}
          yLabel={yLabel}
          legend={legend}
          title={title}
          grid={grid}
        />
      )}
      {type === "Scatter" && (
        <SimpleScatterComp
          data={data}
          primaryColumn={primaryColumn}
          valueColumns={valueColumns}
          width={width}
          height={height}
          xLabel={xLabel}
          yLabel={yLabel}
          legend={legend}
          title={title}
          grid={grid}
        />
      )}
      {type === "Area" && (
        <SimpleAreaComp
          data={data}
          primaryColumn={primaryColumn}
          valueColumns={valueColumns}
          width={width}
          height={height}
          xLabel={xLabel}
          yLabel={yLabel}
          legend={legend}
          title={title}
          grid={grid}
        />
      )}
      {type === "Line" && (
        <LineComp
          data={data}
          primaryColumn={primaryColumn}
          valueColumns={valueColumns}
          width={width}
          height={height}
          xLabel={xLabel}
          yLabel={yLabel}
          legend={legend}
          title={title}
          grid={grid}
        />
      )}
    </div>
    </div>
  )
}

export default ShareableUrl
