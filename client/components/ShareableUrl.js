import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleChart } from '../store/singleChart'
import {useParams} from 'react-router-dom'
import charts from "./chartComponents";

const { BarComp, SimpleAreaComp, SimpleScatterComp, LineComp, StackedAreaComp, StackedBarComp, PieComp } = charts;

const ShareableUrl = () => {
 const dispatch = useDispatch()
 const {chartId} = useParams()
 const {type, dataTable, primaryColumn, valueColumns, width, height, xLabel,yLabel, legend, title, grid} = useSelector(state => state.singleChart)
 useEffect(() => {
  dispatch(fetchSingleChart(chartId))
 }, [])

  return (
    <div>
      <h1 className="share-title">Shared Page</h1>
      {!type ? (
        <div><h4>Chart Not Found</h4></div>
      ): (
        <div className="share-charts">
          {type === "Bar" && (
              <BarComp
                data={dataTable.data}
                primaryColumn={primaryColumn}
                valueColumns={valueColumns}
                width={width || 500}
                height={height || 400}
                xLabel={xLabel}
                yLabel={yLabel}
                legend={legend}
                title={title}
                grid={grid}
              />
            )}
            {type === "Stacked Bar" && (
              <StackedBarComp
                data={dataTable.data}
                primaryColumn={primaryColumn}
                valueColumns={valueColumns}
                width={width || 500}
                height={height || 400}
                xLabel={xLabel}
                yLabel={yLabel}
                legend={legend}
                title={title}
                grid={grid}
              />
            )}
            {type === "Scatter" && (
              <SimpleScatterComp
                data={dataTable.data}
                primaryColumn={primaryColumn}
                valueColumns={valueColumns}
                width={width || 500}
                height={height || 400}
                xLabel={xLabel}
                yLabel={yLabel}
                legend={legend}
                title={title}
                grid={grid}
              />
            )}
            {type === "Area" && (
              <SimpleAreaComp
                data={dataTable.data}
                primaryColumn={primaryColumn}
                valueColumns={valueColumns}
                width={width || 500}
                height={height || 400}
                xLabel={xLabel}
                yLabel={yLabel}
                legend={legend}
                title={title}
                grid={grid}
              />
            )}
            {type === "Stacked Area" && (
              <StackedAreaComp
                data={dataTable.data}
                primaryColumn={primaryColumn}
                valueColumns={valueColumns}
                width={width || 500}
                height={height || 400}
                xLabel={xLabel}
                yLabel={yLabel}
                legend={legend}
                title={title}
                grid={grid}
              />
            )}
            {type === "Line" && (
              <LineComp
                data={dataTable.data}
                primaryColumn={primaryColumn}
                valueColumns={valueColumns}
                width={width || 500}
                height={height || 400}
                xLabel={xLabel}
                yLabel={yLabel}
                legend={legend}
                title={title}
                grid={grid}
              />
            )}
            {type === "Pie" && (
              <PieComp
                data={dataTable.data}
                primaryColumn={primaryColumn}
                valueColumns={valueColumns}
                width={width || 500}
                height={height || 400}
                xLabel={xLabel}
                yLabel={yLabel}
                legend={legend}
                title={title}
                grid={grid}

              />
            )}
        </div>
      )}
    </div>
  )
}

export default ShareableUrl
