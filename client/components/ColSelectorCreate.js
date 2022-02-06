import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomColor } from "../utility";
import {
  _setPrimaryColumn,
  _removePrimaryColumn,
  _setValueColumns,
  _removeValueColumn,
} from "../store/selectColumns";

const ColSelectorCreate = (props) => {
  const { type } = props;
  const { data, selectedColumns } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);
  const [infoBox, setInfoBox] = useState("");

  useEffect(() => {
    setColumns(Object.keys(data[0]));
  }, []);

  useEffect(() => {
    const primaryInfo = {
        "": "Select a chart.",
        "Bar": "Accepts numbers, strings, and dates.",
        "Scatter": "Accepts numbers and dates.",
        
    }
  }, [type])

  const handleSelectColumn = (e) => {
    const axis = e.target.name;
    const column = e.target.value;
    if (axis === "primary") {
      dispatch(_setPrimaryColumn(column));
    } else if (
      !selectedColumns.values.filter((obj) => obj.name === column).length
    ) {
      dispatch(_setValueColumns({ name: column, color: getRandomColor() }));
    }
  };

  const handleDeSelectColumn = (axis, columnName) => {
    if (axis === "primary") {
      dispatch(_removePrimaryColumn(""));
    } else {
      dispatch(_removeValueColumn(columnName));
    }
  };

  return (
    <div className="col-selector-container">
      <div className="primary-container">
        <div className="primary-selector">
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
        </div>
        {!selectedColumns.primary ? (
          <div className="selected-primary">
            <div className="col-info-box">
              <p>info box</p>
            </div>
            <p>
              <small>You haven't selected anything</small>
            </p>
          </div>
        ) : (
          <div className="selected-primary">
            <div className="col-info-box">
              <p>info box</p>
            </div>
            <div className="col-selected">
              <p>{`${selectedColumns.primary} `}</p>
              <small onClick={() => handleDeSelectColumn("primary")}>X</small>
            </div>
          </div>
        )}
      </div>
      <div className="values-container">
        <div className="values-selector">
          <label htmlFor="values">Select values:</label>
          <select
            name="values"
            id="values-column-select"
            size="3"
            onChange={handleSelectColumn}
          >
            <option value="" disabled>
              --Choose column--
            </option>
            {columns.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {!selectedColumns.values.length ? (
          <div className="selected-values">
            <div className="col-info-box">
              <p>info box</p>
            </div>
            <p>
              <small>You haven't selected anything</small>
            </p>
          </div>
        ) : (
          <div className="selected-values">
            <div className="col-info-box">
              <p>info box</p>
            </div>
            {selectedColumns.values.map((val, i) => (
              <div key={i} className="col-selected">
                <p>{`${val.name} `}</p>
                <small onClick={() => handleDeSelectColumn("values", val.name)}>
                  X
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColSelectorCreate;
