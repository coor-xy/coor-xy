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
              <button onClick={handleCancelLoad}>Reset</button>
            </div>
          )}
        </div>
        <div className="data-preview-container">
          {!data.length ? (
            <div>
              <p>
                <small>
                  You can upload a .CSV file or select from data you've used in
                  other charts.
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

      <div>
        <hr />
      </div>

      {isFileSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <label htmlFor="headers">My data has headers</label>
          <br></br>
          <div onChange={handleHasHeaders}>
            <input type="radio" value={true} name="headers" defaultChecked />{" "}
            <small>Yes</small>
            <input type="radio" value={false} name="headers" />{" "}
            <small>No</small>
          </div>
          <div>
            <button onClick={handleLoadFile}>Load file</button>
            <button onClick={handleCancelSelect}>Cancel</button>
          </div>
        </div>
      ) : !data.length ? (
        <div>
          <div>
            <label htmlFor="file">Select a CSV file</label>
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={handleSelectFile}
            />
          </div>
          {!!userData.length && (
            <div>
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
        <div>
          <div>
            <button onClick={handleCancelLoad}>Cancel</button>
          </div>
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
          <div>
            <p>
              DevNote: Choose charts here and setSelectedChartType to that chart
              type
            </p>
            {/* <Link
              to={{
                pathname: "/edit",
                state: { type: "Line" },
              }}
            >
              <p>chart goes here</p>
            </Link> */}
            <div onClick={() => handleChartSelect("Bar")}>
              <DummyChart type={"Bar"} />
            </div>
            <div onClick={() => handleChartSelect("Line")}>
              <DummyChart type={"Line"} />
            </div>
            <div onClick={() => handleChartSelect("Scatter")}>
              <DummyChart type={"Scatter"} />
            </div>
            <div onClick={() => handleChartSelect("Area")}>
              <DummyChart type={"Area"} />
            </div>
            {console.log(selectedChartType)}
          </div>
          <div>
            <ColumnSelector />
          </div>
          <div>
            {selectedColumns.primary && selectedColumns.values.length ? (
              <div>
                {selectedChartType === "Bar" && (
                  <BarComp
                    data={data}
                    primaryColumn={selectedColumns.primary}
                    valueColumns={selectedColumns.values}
                  />
                )}
                {selectedChartType === "Scatter" && (
                  <SimpleScatterComp
                    data={data}
                    primaryColumn={selectedColumns.primary}
                    valueColumns={selectedColumns.values}
                  />
                )}
                {selectedChartType === "Area" && (
                  <SimpleAreaComp
                    data={data}
                    primaryColumn={selectedColumns.primary}
                    valueColumns={selectedColumns.values}
                  />
                )}
                {selectedChartType === "Line" && (
                  <LineComp
                    data={data}
                    primaryColumn={selectedColumns.primary}
                    valueColumns={selectedColumns.values}
                  />
                )}
              </div>
            ) : (
              <div>
                <p>
                  DevNote: display a blank box where a chart would go (goes away
                  when they select dimensions)
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
