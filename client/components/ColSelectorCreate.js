import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomColor } from "../utility";
import {
  _setPrimaryColumn,
  _removePrimaryColumn,
  _setValueColumns,
  _removeValueColumn,
} from "../store/selectColumns";

const columnInfo = {
  "": {
    primaryInfoBox: "Select a chart.",
    valuesInfoBox: "Select a chart.",
    primaryLabel: "",
    valuesLabel: "",
  },
  Bar: {
    primaryInfoBox: "Accepts numbers, strings, and dates",
    valuesInfoBox: "Accepts numbers",
    primaryLabel: "Select a horizontal variable",
    valuesLabel: "Select vertical variables",
  },
  Scatter: {
    primaryInfoBox: "Accepts numbers and dates",
    valuesInfoBox: "Accepts numbers",
    primaryLabel: "Select a X variable",
    valuesLabel: "Select a Y variable",
  },
  Line: {
    primaryInfoBox: "Accepts numbers and dates",
    valuesInfoBox: "Accepts numbers",
    primaryLabel: "Select a horizontal variable",
    valuesLabel: "Select lines",
  },
  Area: {
    primaryInfoBox: "Accepts numbers, strings, and dates",
    valuesInfoBox: "Accepts numbers",
    primaryLabel: "Select a horizontal variable",
    valuesLabel: "Select vertical variables",
  },
  "Stacked Area": {
    primaryInfoBox: "Accepts numbers, strings, and dates",
    valuesInfoBox: "Accepts numbers",
    primaryLabel: "Select a horizontal variable",
    valuesLabel: "Select vertical variables",
  },
  "Stacked Bar": {
    primaryInfoBox: "Accepts numbers, strings, and dates",
    valuesInfoBox: "Accepts numbers",
    primaryLabel: "Select a horizontal variable",
    valuesLabel: "Select vertical variables",
  },
  "Pie": {
    primaryInfoBox: "Accepts numbers, strings, and dates",
    valuesInfoBox: "Accepts numbers",
    primaryLabel: "Select slice variable",
    valuesLabel: "Select arcs",
  }
};

const ColSelectorCreate = (props) => {
  const { type } = props;
  const { data, selectedColumns } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);
  const [colGuidance, setColGuidance] = useState({});

  useEffect(() => {
    setColumns(Object.keys(data[0]));
  }, []);

  useEffect(() => {
      setColGuidance(columnInfo[type]);
  }, [type]);

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
          <label htmlFor="primary">{colGuidance.primaryLabel}</label>
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
            <p><small>{colGuidance.primaryInfoBox}</small></p>
            </div>
            <p>
              <small>You haven't selected anything</small>
            </p>
          </div>
        ) : (
          <div className="selected-primary">
            <div className="col-info-box">
              <p><small>{colGuidance.primaryInfoBox}</small></p>
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
          <label htmlFor="values">{colGuidance.valuesLabel}</label>
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
              <p><small>{colGuidance.valuesInfoBox}</small></p>
            </div>
            <p>
              <small>You haven't selected anything</small>
            </p>
          </div>
        ) : (
          <div className="selected-values">
            <div className="col-info-box">
              <p><small>{colGuidance.valuesInfoBox}</small></p>
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
