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

const dummyData = [
  {
    "Group": "Group A",
    "Q1": "1000",
    "Q2": "1100",
    "Q3": "1200",
    "Q4": "1300",
    "Price": "100",
    "Quantity": "10",
    "Arch": ".3",
    "Month": "1",
    "Weight": "180"
  },
  {
    "Group": "Group B",
    "Q1": "2250",
    "Q2": "2350",
    "Q3": "2300",
    "Q4": "2250",
    "Price": "80",
    "Quantity": "15",
    "Arch": ".2",
    "Month": "2",
    "Weight": "175"
  },
  {
    "Group": "Group C",
    "Q1": "1280",
    "Q2": "1380",
    "Q3": "1480",
    "Q4": "1580",
    "Price": "60",
    "Quantity": "30",
    "Arch": ".4",
    "Month": "3",
    "Weight": "170"
  },
  {
    "Group": "Group D",
    "Q1": "970",
    "Q2": "1070",
    "Q3": "1170",
    "Q4": "1270",
    "Price": "20",
    "Quantity": "50",
    "Arch": ".1",
    "Month": "4",
    "Weight": "165"
  }
]

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
  };

  const handlePreviousDataSelect = (e) => {
    const dataTableId = parseInt(e.target.value);
    if (dataTableId) {
      const prevData = userData.filter((c) => c.id === dataTableId);
      dispatch(_setData(prevData[0].data));
      dispatch(_setDataId(dataTableId));
    }
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
          {!!userData.length && (
            <div>
              <p>OR</p>

              <label htmlFor="previousData">
                Select data you've already uploaded:
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
            <BarComp
              data={dummyData}
              primaryColumn={"Group"}
              valueColumns={[
                { name: "Q1", color: "#fda25a" },
                { name: "Q2", color: "#74bdb4" },
                { name: "Q3", color: "#8067f5" },
                { name: "Q4", color: "#e6837d" },
              ]}
            />
            <SimpleScatterComp
              data={dummyData}
              primaryColumn={"Quantity"}
              valueColumns={[{ name: "Price", color: "#e6837d" }]}
            />
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
