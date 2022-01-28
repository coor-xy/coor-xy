import React, { useState } from "react";
import Papa from "papaparse";

const Create = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [data, setData] = useState([]);

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

  const handleLoadFile = () => {
    Papa.parse(selectedFile, {
      header: hasHeaders,
      complete: function (results) {
        setData(results.data);
      },
    });
    handleCancelSelect();
  };

  const setPreviewRange = (data) => {
    return data.length >= 10 ? data.slice(0, 11) : data;
  };

  const handleCancelLoad = () => {
    setData([]);
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
          />
        </div>
      ) : (
        <div>
          <div>
            <button onClick={handleCancelLoad}>Cancel</button>
          </div>
          {!hasHeaders ? (
            <table>
              <tbody>
                {setPreviewRange(data).map((tr, i) => (
                  <tr key={i}>
                    {tr.map((td, j) => (
                      <td key={j}>{td}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
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
                <tr>
                  <th></th>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Create;
