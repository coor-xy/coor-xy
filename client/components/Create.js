import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Papa from "papaparse";
import charts from "./chartComponents";
import { Link } from "react-router-dom";
import { _setSelectedColumns } from "../store/selectColumns";
import { _setData } from "../store/data";
import axios from "axios";
import { getRandomColor } from "../utility";
const {
  BarComp,
  SimpleAreaComp,
  SimpleScatterComp,
  LineComp
} = charts;

const Create = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState({
    primary: "",
    values: [],
  });
  const dispatch = useDispatch();

  const handleSelectFile = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setIsFileSelected(true);
    // const { data: url } = await axios.get('/s3url')
    // await axios.put(url, file, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    // const fileUrl = url.split('?')[0]
    // console.log('file url:', fileUrl)
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
      setData(data);
      setColumns(Object.keys(data[0]));
    } else {
      const formattedData = data.map((d) =>
        d.reduce((acc, cellValue, i) => {
          acc[`Col ${i + 1}`] = cellValue;
          return acc;
        }, {})
      );
      setData(formattedData);
      setColumns(Object.keys(formattedData[0]));
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
    setData([]);
    setHasHeaders(true);
    setSelectedColumns({
      primary: "",
      values: [],
    });
  };

  const handleSelectColumn = (e) => {
    const axis = e.target.name;
    const column = e.target.value;
    if (axis === "primary") {
      setSelectedColumns({ ...selectedColumns, [axis]: column });
    } else if (!selectedColumns[axis].includes(column)) {
      setSelectedColumns({
        ...selectedColumns,
        [axis]: [
          ...selectedColumns[axis],
          { name: column, color: getRandomColor() },
        ],
      });
    }
  };

  const handleDeSelectColumn = (axis, column) => {
    if (axis === "primary") {
      setSelectedColumns({ ...selectedColumns, [axis]: "" });
    } else {
      setSelectedColumns({
        ...selectedColumns,
        [axis]: selectedColumns[axis].filter((y) => y.name !== column),
      });
    }
  };

  const handleSendToReduxStore = () => {
    dispatch(_setData(data));
    dispatch(_setSelectedColumns(selectedColumns));
  };

  return (
    <div>
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
          <p>Select a CSV file</p>
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={handleSelectFile}
            // onClick={async () => {
            //   const {data} = await axios.get('https://coor-xy-files.s3.amazonaws.com/1ac043e6-e16d-4fd6-aaa1-6ed483062e23.csv')
            //   setSelectedFile(data)
            //   setIsFileSelected(true)
            // }}
          />
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
            <div>
              <div>
                <label htmlFor="primary">Select a primary axis:</label>
                <select
                  name="primary"
                  id="primary-column-select"
                  size="3"
                  onChange={handleSelectColumn}
                >
                  <option value="" disabled>
                    --Choose a column--
                  </option>
                  {columns.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {!selectedColumns.primary ? (
                  <div>
                    <p>
                      <small>You haven't selected anything</small>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      <small>Selected column: </small>
                    </p>
                    <p>
                      {`${selectedColumns.primary} `}
                      <small onClick={() => handleDeSelectColumn("primary")}>
                        remove
                      </small>
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="values">Select values:</label>
                <select
                  name="values"
                  id="values-column-select"
                  size="3"
                  onChange={handleSelectColumn}
                >
                  <option value="" disabled>
                    --Choose a column--
                  </option>
                  {columns.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {!selectedColumns.values.length ? (
                  <div>
                    <p>
                      <small>You haven't selected anything</small>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      <small>Selected Columns: </small>
                    </p>
                    {selectedColumns.values.map((val, i) => (
                      <p key={i}>
                        {`${val.name} `}
                        <small
                          onClick={() =>
                            handleDeSelectColumn("values", val.name)
                          }
                        >
                          remove
                        </small>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {selectedColumns.primary && selectedColumns.values.length ? (
              <div>
                <Link
                  to={{
                    pathname: "/edit",
                    state: { type: "Bar" },
                  }}
                  onClick={handleSendToReduxStore}
                >
                  <BarComp
                    data={data}
                    primaryColumn={selectedColumns.primary}
                    valueColumns={selectedColumns.values}
                  />
                </Link>
                <Link
                  to={{
                    pathname: "/edit",
                    state: { type: "Scatter" },
                  }}
                  onClick={handleSendToReduxStore}
                >
                  <SimpleScatterComp
                    data={data}
                    primaryColumn={selectedColumns.primary}
                    valueColumns={selectedColumns.values}
                  />
                </Link>
                <Link
                  to={{
                    pathname: "/edit",
                    state: { type: "Area" },
                  }}
                  onClick={handleSendToReduxStore}
                >
                  <SimpleAreaComp
                    data={data}
                    primaryColumn={selectedColumns.primary}
                    valueColumns={selectedColumns.values}
                  />
                </Link>
                <Link
                  to={{
                    pathname: "/edit",
                    state: { type: "Line" },
                  }}
                  onClick={handleSendToReduxStore}
                >
                  <LineComp
                    data={data}
                    primaryColumn={selectedColumns.primary}
                    valueColumns={selectedColumns.values}
                  />
                </Link>
              </div>
            ) : (
              <div>
                {/*not sure what goes here, maybe charts with default data */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
