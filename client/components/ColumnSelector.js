import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomColor } from '../utility';
import {
  _setPrimaryColumn,
  _removePrimaryColumn,
  _setValueColumns,
  _removeValueColumn,
} from '../store/selectColumns';

const ColumnSelector = () => {
  const { data, selectedColumns } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(Object.keys(data[0]));
  }, []);

  const handleSelectColumn = (e) => {
    const axis = e.target.name;
    const column = e.target.value;
    if (axis === 'primary') {
      dispatch(_setPrimaryColumn(column));
    } else if (
      !selectedColumns.values.filter((obj) => obj.name === column).length
    ) {
      dispatch(_setValueColumns({ name: column, color: getRandomColor() }));
    }
  };

  const handleDeSelectColumn = (axis, columnName) => {
    if (axis === 'primary') {
      dispatch(_removePrimaryColumn(''));
    } else {
      dispatch(_removeValueColumn(columnName));
    }
  };

  return (
    <div>
      <div className='column-selector-axis'>
        <label htmlFor='primary'>Select a primary axis</label>
        <select
          name='primary'
          id='primary-column-select'
          size='3'
          onChange={handleSelectColumn}
        >
          <option value='' disabled>
            --Choose a column--
          </option>
          {columns.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
        {!selectedColumns.primary ? (
          <small>You haven't selected anything</small>
        ) : (
          <>
            <label>
              <small>Selected column: </small>
            </label>

            <label>{`${selectedColumns.primary}`}</label>
            <label>
              <button
                id='primary-column-button'
                onClick={() => handleDeSelectColumn('primary')}
              >
                remove
              </button>
            </label>
          </>
        )}
      </div>
      <div className='column-selector-values'>
        <label htmlFor='values'>Select values</label>
        <select
          name='values'
          id='values-column-select'
          size='3'
          onChange={handleSelectColumn}
        >
          <option value='' disabled>
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
          <>
            <label>
              <small>Selected Columns: </small>
            </label>

            {selectedColumns.values.map((val, i) => (
              <>
                <label key={i}>{`${val.name} `}</label>
                <label>
                  <button
                    id='selected-column-button'
                    onClick={() => handleDeSelectColumn('values', val.name)}
                  >
                    remove
                  </button>
                </label>
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ColumnSelector;
