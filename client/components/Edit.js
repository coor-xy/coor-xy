import React, { useEffect, useState } from 'react';
import history from '../history';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import charts from './chartComponents';
import {
  _changeColor,
  _clearAllValues,
  _removePrimaryColumn,
} from '../store/selectColumns';
import ColumnSelector from './ColumnSelector';
import Share from './Share';
import Modal from 'react-bootstrap/Modal';
import { postConfig, putConfig } from '../store/chartConfigs';
import { _setDataId } from '../store/dataId';
import { postData, _setData } from '../store/data';
import { removeChart } from '../store/charts';
const {
  BarComp,
  SimpleAreaComp,
  SimpleScatterComp,
  LineComp,
  StackedBarComp,
  StackedAreaComp,
  PieComp,
} = charts;

const Edit = () => {
  const location = useLocation();
  let type;
  let chartId;
  if (location.state) {
    type = location.state.type;
    chartId = location.state.chartId;
  }
  const { data, selectedColumns, chartConfigs, prevDataId } = useSelector(
    (state) => state
  );
  const availableCharts = [
    'Bar',
    'Stacked Bar',
    'Funnel',
    'Line',
    'Pie',
    'Area',
    'Stacked Area',
    'Scatter',
  ];
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
  const dispatch = useDispatch();
  const [download, setDownload] = useState(false);

  const handleConfigChange = (e) => {
    if (e.target.type === 'number') {
      setChartConfig({
        ...chartConfig,
        [e.target.name]: parseInt(e.target.value),
      });
    } else if (e.target.type === 'checkbox') {
      setChartConfig({ ...chartConfig, [e.target.name]: e.target.checked });
    } else {
      setChartConfig({ ...chartConfig, [e.target.name]: e.target.value });
    }
  };

  const handleSeriesColorChange = (e) => {
    const { name, value } = e.target;
    dispatch(_changeColor({ name, color: value }));
  };

  const handleConfigSubmit = (e) => {
    e.preventDefault();
    if (chartId !== undefined) {
      dispatch(
        putConfig(
          {
            ...chartConfig,
            primaryColumn: selectedColumns.primary,
            valueColumns: selectedColumns.values,
          },
          chartId
        )
      );
    } else if (prevDataId != 0) {
      dispatch(
        postConfig(
          {
            ...chartConfig,
            primaryColumn: selectedColumns.primary,
            valueColumns: selectedColumns.values,
          },
          prevDataId
        )
      );
    } else {
      dispatch(
        postData(data, {
          ...chartConfig,
          primaryColumn: selectedColumns.primary,
          valueColumns: selectedColumns.values,
        })
      );
    }
  };
  const [modalShow, setModalShow] = React.useState(false);

  const handleDelete = () => {
    dispatch(removeChart(chartId));
  };

  const handleDownload = () => {
    setDownload(true);
    setTimeout(() => {
      setDownload(false);
    }, 1000);
  };

  return (
    <div>
      {!data.length ? (
        <div>
          <p>Try to create a component</p>
        </div>
      ) : (
        <div className='editpage-container'>
          <div className='editpage-left-column'>
            <div>
              <form id='editpage-form' onSubmit={handleConfigSubmit}>
                <label htmlFor='type'>
                  <small>Chart Type</small>
                </label>
                <select
                  name='type'
                  value={chartConfig.type}
                  onChange={handleConfigChange}
                >
                  {availableCharts.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <label htmlFor='width'>
                  <small>Width</small>
                </label>
                <input
                  name='width'
                  type='number'
                  value={chartConfig.width}
                  onChange={handleConfigChange}
                />

                <label htmlFor='height'>
                  <small>Height</small>
                </label>
                <input
                  name='height'
                  type='number'
                  value={chartConfig.height}
                  onChange={handleConfigChange}
                />

                <label htmlFor='title'>
                  <small>Title</small>
                </label>
                <input
                  name='title'
                  value={chartConfig.title}
                  onChange={handleConfigChange}
                />

                <label htmlFor='xLabel'>
                  <small>X-Label</small>
                </label>
                <input
                  name='xLabel'
                  value={chartConfig.xLabel}
                  onChange={handleConfigChange}
                />

                <label htmlFor='yLabel'>
                  <small>Y-Label</small>
                </label>
                <input
                  name='yLabel'
                  value={chartConfig.yLabel}
                  onChange={handleConfigChange}
                />

                {selectedColumns.values.map((series, index) => (
                  <>
                    <label htmlFor={series.name} key={index}>
                      <small>{`${series.name} Color`}</small>
                    </label>
                    <input
                      name={series.name}
                      type='color'
                      value={series.color}
                      onChange={handleSeriesColorChange}
                    />
                  </>
                ))}

                <label htmlFor='legend'>
                  <small>Legend</small>
                </label>
                <input
                  name='legend'
                  type='checkbox'
                  checked={chartConfig.legend}
                  onChange={handleConfigChange}
                />

                <label htmlFor='grid'>
                  <small>Grid</small>
                </label>
                <input
                  name='grid'
                  type='checkbox'
                  checked={chartConfig.grid}
                  onChange={handleConfigChange}
                />
              </form>
              <ColumnSelector />
            </div>
          </div>

          <div className='editpage-right-column'>
            <div className='editpage-buttons'>
              <button onClick={handleDownload}>Download</button>
              <Share
                id={chartId}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <button type='submit' form='editpage-form'>
                SAVE CHANGES
              </button>
              {chartId !== undefined ? (
                <button onClick={handleDelete}>DELETE</button>
              ) : (
                <></>
              )}
              <button
                onClick={() => {
                  dispatch(_setData([]));
                  dispatch(_removePrimaryColumn(''));
                  dispatch(_clearAllValues());
                  dispatch(_setDataId(0));
                  history.goBack();
                }}
              >
                CANCEL
              </button>
            </div>
            <div className='editpage-chart'>
              <div>
                {chartConfig.type === 'Bar' && (
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
                    download={download}
                  />
                )}
                {chartConfig.type === 'Stacked Bar' && (
                  <StackedBarComp
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
                    download={download}
                  />
                )}
                {chartConfig.type === 'Scatter' && (
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
                    download={download}
                  />
                )}
                {chartConfig.type === 'Area' && (
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
                    download={download}
                  />
                )}
                {chartConfig.type === 'Stacked Area' && (
                  <StackedAreaComp
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
                    download={download}
                  />
                )}
                {chartConfig.type === 'Line' && (
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
                    download={download}
                  />
                )}
                {chartConfig.type === 'Pie' && (
                  <PieComp
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
                    download={download}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
