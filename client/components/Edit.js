import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import charts from "./chartComponents";
import { _changeColor } from "../store/selectColumns"
import ColumnSelector from "./ColumnSelector";
import Share from './Share'
import Modal from 'react-bootstrap/Modal'
import { postConfig } from "../store/chartConfigs";
import { _setDataId } from "../store/dataId";
import { postData, _setData } from "../store/data";
const { BarComp, SimpleAreaComp, SimpleScatterComp, LineComp } = charts;


const Edit = () => {
  const location = useLocation();
  let type;
  let chartId;
  if (location.state){
    type = location.state.type
    chartId = location.state.chartId
  }
  const { data, selectedColumns, chartConfigs, prevDataId } = useSelector((state) => state);
  const availableCharts = ["Bar", "Funnel", "Line", "Pie", "Area", "Scatter"];
  const [chartConfig, setChartConfig] = useState({
    type: type || '',
    width: chartConfigs.width || 500,
    height: chartConfigs.height || 350,
    xLabel: chartConfigs.xLabel,
    yLabel: chartConfigs.yLabel,
    legend: chartConfigs.legend,
    title: chartConfigs.title,
    grid: chartConfigs.grid,
  });
  const dispatch = useDispatch()

  const handleConfigChange = (e) => {
    if (e.target.type === "number") {
      setChartConfig({
        ...chartConfig,
        [e.target.name]: parseInt(e.target.value),
      });
    } else if (e.target.type === "checkbox"){
      setChartConfig({ ...chartConfig, [e.target.name]: e.target.checked })
    } else {
      setChartConfig({ ...chartConfig, [e.target.name]: e.target.value });
    }
  };

  const handleSeriesColorChange = (e) => {
    const { name, value } = e.target
    dispatch(_changeColor({name, color: value}))
  };

  const handleConfigSubmit = (e) => {
    e.preventDefault();
    if (chartId!==undefined){
    dispatch(postConfig({...chartConfig,primaryColumn:selectedColumns.primary,valueColumns:selectedColumns.values}, chartId))
    } else {
      dispatch(postData(data,{...chartConfig,primaryColumn:selectedColumns.primary,valueColumns:selectedColumns.values}))
    }
  };

  const [modalShow, setModalShow] = React.useState(false)

  return (
    <div>
      {!data.length ? (
        <div>
          <p>Try to create a component</p>
        </div>
      ) : (
        <div>
          <div>
      <Share id = {chartId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
            <button>Delete</button>
          </div>
          <div>
            <form onSubmit={handleConfigSubmit}>
              <div>
                <label htmlFor="type">
                  <small>Chart Type</small>
                </label>
                <select
                  name="type"
                  value={chartConfig.type}
                  onChange={handleConfigChange}
                >
                  {availableCharts.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="width">
                  <small>Width:</small>
                </label>
                <input
                  name="width"
                  type="number"
                  value={chartConfig.width}
                  onChange={handleConfigChange}
                />
              </div>

              <div>
                <label htmlFor="height">
                  <small>Height:</small>
                </label>
                <input
                  name="height"
                  type="number"
                  value={chartConfig.height}
                  onChange={handleConfigChange}
                />
              </div>

              <div>
                <label htmlFor="title">
                  <small>Title:</small>
                </label>
                <input
                  name="title"
                  value={chartConfig.title}
                  onChange={handleConfigChange}
                />
              </div>

              <div>
                <label htmlFor="xLabel">
                  <small>X-Label:</small>
                </label>
                <input
                  name="xLabel"
                  value={chartConfig.xLabel}
                  onChange={handleConfigChange}
                />
              </div>

              <div>
                <label htmlFor="yLabel">
                  <small>Y-Label:</small>
                </label>
                <input
                  name="yLabel"
                  value={chartConfig.yLabel}
                  onChange={handleConfigChange}
                />
              </div>

              <div>
                <label htmlFor="legend">
                  <small>Legend:</small>
                </label>
                <input
                  name="legend"
                  type="checkbox"
                  checked={chartConfig.legend}
                  onChange={handleConfigChange}
                />
              </div>

              <div>
                <label htmlFor="grid">
                  <small>Grid:</small>
                </label>
                <input
                  name="grid"
                  type="checkbox"
                  checked={chartConfig.grid}
                  onChange={handleConfigChange}
                />
              </div>

              {selectedColumns.values.map((series, index) => (
                <div key={index}>
                  <label htmlFor={series.name}>
                    <small>{`${series.name} color`}</small>
                  </label>
                  <input
                    name={series.name}
                    type="color"
                    value={series.color}
                    onChange={handleSeriesColorChange}
                  />
                </div>
              ))}

              <button type="submit">Save Changes</button>
            </form>
            {console.log(chartConfig)}
          </div>
          <div className="bottom-half-container">
          <ColumnSelector />
            {chartConfig.type === "Bar" && (
              <BarComp
                data={data}
                primaryColumn={selectedColumns.primary}
                valueColumns={selectedColumns.values}
                width={chartConfig.width}
                height={chartConfig.height}
                xLabel={chartConfig.xLabel}
                yLabel={chartConfig.yLabel}
                legend={chartConfig.legend}
                title={chartConfig.title}
                grid={chartConfig.grid}
              />
            )}
            {chartConfig.type === "Scatter" && (
              <SimpleScatterComp
                data={data}
                primaryColumn={selectedColumns.primary}
                valueColumns={selectedColumns.values}
                width={chartConfig.width}
                height={chartConfig.height}
                xLabel={chartConfig.xLabel}
                yLabel={chartConfig.yLabel}
                legend={chartConfig.legend}
                title={chartConfig.title}
                grid={chartConfig.grid}
              />
            )}
            {chartConfig.type === "Area" && (
              <SimpleAreaComp
                data={data}
                primaryColumn={selectedColumns.primary}
                valueColumns={selectedColumns.values}
                width={chartConfig.width}
                height={chartConfig.height}
                xLabel={chartConfig.xLabel}
                yLabel={chartConfig.yLabel}
                legend={chartConfig.legend}
                title={chartConfig.title}
                grid={chartConfig.grid}
              />
            )}
            {chartConfig.type === "Line" && (
              <LineComp
                data={data}
                primaryColumn={selectedColumns.primary}
                valueColumns={selectedColumns.values}
                width={chartConfig.width}
                height={chartConfig.height}
                xLabel={chartConfig.xLabel}
                yLabel={chartConfig.yLabel}
                legend={chartConfig.legend}
                title={chartConfig.title}
                grid={chartConfig.grid}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
