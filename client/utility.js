export const transformData = (data, primaryColumn, valueColumns) => {
  return data.map((d) => {
    const row = {};
    row[primaryColumn] = d[primaryColumn];
    valueColumns.map((column) => (row[column.name] = parseInt(d[column.name])));
    return row;
  });
};

export const getRandomColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};
