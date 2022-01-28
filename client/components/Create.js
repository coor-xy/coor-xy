import React, { useState } from "react";
import Papa from "papaparse";

const Create = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedAxis, setSelectedAxis] = useState({
      x: "",
      y: ""
  });

  const handleSelectFile = (e) => {
    setSelectedFile(e.target.files[0]);
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
  };

  const handleAxisSelection = (e) => {
    setSelectedAxis({...selectedAxis, [e.target.name]: e.target.value });
  }

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
            <label htmlFor="x">Choose horizontal axis:</label>
            <select name="x" id="horizontal-column-select" onChange={handleAxisSelection}>
              <option value="">--Choose an option--</option>
              {columns.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label htmlFor="y">Choose vertical axis:</label>
            <select name="y" id="vertical-column-select" onChange={handleAxisSelection}>
              <option value="">--Choose an option--</option>
              {columns.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {console.log(selectedAxis)}
          </div> 
        </div>
      )}
    </div>
  );
};

export default Create;
