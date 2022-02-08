import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import charts from "./chartComponents";
import { Link } from "react-router-dom";
import { _removePrimaryColumn, _clearAllValues } from "../store/selectColumns";
import { _setData } from "../store/data";
import ColumnSelector from "./ColumnSelector";
import { fetchDataDB } from "../store/dataDB";
import { _setDataId } from "../store/dataId";
import DummyChart from "./DummyChart";
const { BarComp, SimpleAreaComp, SimpleScatterComp, LineComp } = charts;
import ColSelectorCreate from "./ColSelectorCreate";
import ChartPreview from "./ChartPreview";

const Create = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [hasHeaders, setHasHeaders] = useState(true);
  const { selectedColumns, data, userData } = useSelector((state) => state);
  const [selectedChartType, setSelectedChartType] = useState("");

  useEffect(() => {
    dispatch(fetchDataDB());
  }, []);

  const dispatch = useDispatch();

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setIsFileSelected(true);
  };

  const handleHasHeaders = (e) => {
    const bool = e.target.value === "false" ? false : true;
    setHasHeaders(bool);
  };

  const handleCancelSelect = () => {
    setSelectedFile();
    setIsFileSelected(false);
  };

  const handleData = (data) => {
    if (hasHeaders) {
      dispatch(_setData(data));
    } else {
      const formattedData = data.map((d) =>
        d.reduce((acc, cellValue, i) => {
          acc[`Col ${i + 1}`] = cellValue;
          return acc;
        }, {})
      );
      dispatch(_setData(formattedData));
    }
  };

  const handleLoadFile = () => {
    Papa.parse(selectedFile, {
      header: hasHeaders,
      complete: function (results) {
        handleData(results.data);
      },
    });
    handleCancelSelect();
  };

  const setPreviewRange = (data) => {
    const rowLimit = 5;
    return data.length >= rowLimit ? data.slice(0, rowLimit) : data;
  };

  const handleCancelLoad = () => {
    dispatch(_setData([]));
    dispatch(_removePrimaryColumn(""));
    dispatch(_clearAllValues());
    dispatch(_setDataId(0));
    setHasHeaders(true);
    setSelectedChartType("");
  };

  const handlePreviousDataSelect = (e) => {
    const dataTableId = parseInt(e.target.value);
    if (dataTableId) {
      const prevData = userData.filter((c) => c.id === dataTableId);
      dispatch(_setData(prevData[0].data));
      dispatch(_setDataId(dataTableId));
    }
  };

  const handleChartSelect = (type) => {
    setSelectedChartType(type);
  };

  return (
    <div>
      <h3>Step 1: Select your data</h3>
      <div className="data-select-container">
        <div className="data-select-sidebar-container">
          {!data.length ? (
            !isFileSelected ? (
              <div>
                <div className="data-select-sidebar-item">
                  <label htmlFor="file">Upload a CSV file</label>
                  <div className="file-selector-input">
                    <input
                      type="file"
                      name="file"
                      accept=".csv"
                      onChange={handleSelectFile}
                    />
                  </div>
                </div>
                {!!userData.length && (
                  <div className="data-select-sidebar-item">
                    <label htmlFor="previousData">
                      Or select data you've already uploaded:
                    </label>
                    <select
                      name="previousData"
                      id="previousData"
                      onChange={handlePreviousDataSelect}
                    >
                      <option value="">--Choose data--</option>
                      {userData.map((c, i) => (
                        <option key={i} value={c.id}>
                          {c.id}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ) : (
              <div className="data-select-sidebar-item">
                <p>Filename: {selectedFile.name}</p>
                <label htmlFor="headers">My data has headers</label>
                <div onChange={handleHasHeaders}>
                  <input
                    type="radio"
                    value={true}
                    name="headers"
                    defaultChecked
                  />{" "}
                  <small>Yes</small>
                  <input type="radio" value={false} name="headers" />{" "}
                  <small>No</small>
                </div>
                <br></br>
                <div>
                  <button onClick={handleLoadFile}>Load file</button>
                  <button onClick={handleCancelSelect}>Cancel</button>
                </div>
              </div>
            )
          ) : (
            <div>
              <button onClick={handleCancelLoad}>Start Over</button>
            </div>
          )}
        </div>
        <div className="data-preview-container">
          {!data.length ? (
            <div>
              <p>
                <small>
                  You can upload a .CSV file or select from data you've used in
                  you saved charts.
                </small>
              </p>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((th, i) => (
                      <th key={i}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {setPreviewRange(data).map((tr, i) => (
                    <tr key={i}>
                      {Object.values(tr).map((td, j) => (
                        <td key={j}>{td}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <h3>Step 2: Select a chart</h3>
      <div className="chart-select-container">
        <div
          className={`chart-tile ${
            selectedChartType === "Bar" ? "selected-chart" : ""
          }`}
          onClick={() => handleChartSelect("Bar")}
        >
          <DummyChart type={"Bar"} />
        </div>
        <div
          className={`chart-tile ${
            selectedChartType === "Line" ? "selected-chart" : ""
          }`}
          onClick={() => handleChartSelect("Line")}
        >
          <DummyChart type={"Line"} />
        </div>
        <div
          className={`chart-tile ${
            selectedChartType === "Scatter" ? "selected-chart" : ""
          }`}
          onClick={() => handleChartSelect("Scatter")}
        >
          <DummyChart type={"Scatter"} />
        </div>
        <div
          className={`chart-tile ${
            selectedChartType === "Area" ? "selected-chart" : ""
          }`}
          onClick={() => handleChartSelect("Area")}
        >
          <DummyChart type={"Area"} />
        </div>
        <div
          className={`chart-tile ${
            selectedChartType === "Stacked Area" ? "selected-chart" : ""
          }`}
          onClick={() => handleChartSelect("Stacked Area")}
        >
          <DummyChart type={"Stacked Area"} />
        </div>
        <div
          className={`chart-tile ${
            selectedChartType === "Stacked Bar" ? "selected-chart" : ""
          }`}
          onClick={() => handleChartSelect("Stacked Bar")}
        >
          <DummyChart type={"Stacked Bar"} />
        </div>
        <div
          className={`chart-tile ${
            selectedChartType === "Pie" ? "selected-chart" : ""
          }`}
          onClick={() => handleChartSelect("Pie")}
        >
          <DummyChart type={"Pie"} />
        </div>
      </div>
      {console.log(selectedChartType)}
      <h3>Step 3: Select chart variables</h3>
      <div className="chart-variable-container">
        {data.length && selectedChartType ? (
          <ColSelectorCreate type={selectedChartType} />
        ) : (
          <div>
            <p>
              <small>
                Load your data and select a chart before choosing your chart
                variables.
              </small>
            </p>
          </div>
        )}
      </div>
      <h3>Step 4: Proceed to customize your chart</h3>
      {selectedColumns.primary && selectedColumns.values.length ? (
        <div className="chart-preview-container">
          <div>
            <button onClick={handleCancelLoad}>Start over</button>
          </div>
          <ChartPreview
            type={selectedChartType}
            data={data}
            selectedColumns={selectedColumns}
          />
          <div>
            <Link
              to={{
                pathname: "/edit",
                state: { type: selectedChartType },
              }}
            >
              <button>Customize</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="chart-preview-container">
          <p>
            Once you load your data, select a chart and your chart variables a
            preview will appear.
          </p>
        </div>
      )}
    </div>
  );
};

export default Create;
