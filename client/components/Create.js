import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import charts from './chartComponents';
import { Link } from 'react-router-dom';
import { _removePrimaryColumn, _clearAllValues } from '../store/selectColumns';
import { _setData } from '../store/data';
import axios from 'axios';
import ColumnSelector from './ColumnSelector';
import { fetchDataDB } from '../store/dataDB';

const { BarComp, SimpleAreaComp, SimpleScatterComp, LineComp } = charts;

const Create = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [useDataDB, setUseDataDB] = useState(false);

  const { selectedColumns, data, dataDB, isUser } = useSelector((state) => {
    return {
      selectedColumns: state.selectedColumns,
      data: state.data,
      dataDB: state.dataDB,
      isUser: state.auth.id,
    };
  });

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
    const bool = e.target.value === 'false' ? false : true;
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
    dispatch(_removePrimaryColumn(''));
    dispatch(_clearAllValues());
    setHasHeaders(true);
  };

  const dataName = dataDB.map((data) => {
    return data.id;
  });

  return (
    <div>
      {isFileSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <label htmlFor='headers'>My data has headers</label>
          <br></br>
          <div onChange={handleHasHeaders}>
            <input type='radio' value={true} name='headers' defaultChecked />{' '}
            <small>Yes</small>
            <input type='radio' value={false} name='headers' />{' '}
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
            type='file'
            name='file'
            accept='.csv'
            onChange={handleSelectFile}
            // onClick={async () => {
            //   const {data} = await axios.get('https://coor-xy-files.s3.amazonaws.com/1ac043e6-e16d-4fd6-aaa1-6ed483062e23.csv')
            //   setSelectedFile(data)
            //   setIsFileSelected(true)
            // }}
          />
          {isUser && (
            // add later case for ifData is available
            <div>
              <p>OR</p>

              <label htmlFor='primary'>Select from saved Data:</label>
              <select
                name='primary'
                id='primary-column-select'
                size='3'
                //  onChange={}
              >
                <option value='' disabled>
                  --Choose data--
                </option>
                {dataName.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
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
            <ColumnSelector />
          </div>
          <div>
            {selectedColumns.primary && selectedColumns.values.length ? (
              <div>
                <Link
                  to={{
                    pathname: '/edit',
                    state: { type: 'Bar' },
                  }}
                >
                  <BarComp
                    data={data}
                    primaryColumn={selectedColumns.primary}
                    valueColumns={selectedColumns.values}
                  />
                </Link>
                <Link
                  to={{
                    pathname: '/edit',
                    state: { type: 'Scatter' },
                  }}
                >
                  <SimpleScatterComp
                    data={data}
                    primaryColumn={selectedColumns.primary}
                    valueColumns={selectedColumns.values}
                  />
                </Link>
                <Link
                  to={{
                    pathname: '/edit',
                    state: { type: 'Area' },
                  }}
                >
                  <SimpleAreaComp
                    data={data}
                    primaryColumn={selectedColumns.primary}
                    valueColumns={selectedColumns.values}
                  />
                </Link>
                <Link
                  to={{
                    pathname: '/edit',
                    state: { type: 'Line' },
                  }}
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
