'use strict';

const {
  db,
  models: { User, Chart, RowData },
} = require('../server/db');

const users = [
  {
    username: 'Danny',
    password: '123',
    isAdmin: true,
    email: 'danny@fsa.com',
  },
  {
    username: 'cody',
    password: '123',
    isAdmin: false,
    email: 'cody@fsa.com',
  },
  {
    username: 'murphy',
    password: '123',
    isAdmin: false,
    email: 'murphy@fsa.com',
  },
  {
    username: 'Blaine',
    password: '123',
    isAdmin: true,
    email: 'blaine@fsa.com',
  },
  {
    username: 'Edward',
    password: '123',
    isAdmin: true,
    email: 'edward@fsa.com',
  },
  {
    username: 'David',
    password: '123',
    isAdmin: true,
    email: 'david@fsa.com',
  },
];

const charts = [
  {
    userId: 1,
    type: 'Bar',
    colorPref: [
      { name: 'Q1', color: '#58AC56' },
      { name: 'Q2', color: '#3C8311' },
    ],
    title: 'Bar Chart',
    yLabel: 'value',
    xLabel: 'Group',
    primaryColumn: 'Group',
    valueColumns: [
      {
        name: 'Q1',
        color: '#001487',
      },
      {
        name: 'Q2',
        color: '#F1D2A2',
      },
    ],
  },
  {
    userId: 1,
    type: 'Line',
    colorPref: [
      {
        name: 'Q1',
        color: '#001487',
      },
    ],

    title: 'Line Chart',
    yLabel: 'value',
    xLabel: 'Group',
    primaryColumn: 'Group',
    valueColumns: [
      {
        name: 'Q1',
        color: '#F1D2A2',
      },
    ],
  },
  {
    userId: 2,
    type: 'Bar',
    colorPref: [
      {
        name: 'Q1',
        color: '#001487',
      },
    ],

    title: 'Bar Chart',
    yLabel: 'value',
    xLabel: 'Group',
    primaryColumn: 'Group',
    valueColumns: [
      {
        name: 'Q1',
        color: '#F1D2A2',
      },
    ],
  },
];

//const datas =
const data1 = [
  {
    chartId: 1,
    rowData: {
      Group: 'Group A',
      Q1: '1000',
      Q2: '1100',
      Q3: '1200',
      Q4: '1300',
    },
  },
  {
    chartId: 1,
    rowData: {
      Group: 'Group B',
      Q1: '2250',
      Q2: '2350',
      Q3: '2300',
      Q4: '2250',
    },
  },
  {
    chartId: 1,
    rowData: {
      Group: 'Group C',
      Q1: '1280',
      Q2: '1380',
      Q3: '1480',
      Q4: '1580',
    },
  },
  {
    chartId: 1,
    rowData: {
      Group: 'Group D',
      Q1: '970',
      Q2: '1070',
      Q3: '1170',
      Q4: '1270',
    },
  },
  {
    chartId: 2,
    rowData: {
      Group: 'Group E',
      Q1: '1050',
      Q2: '1100',
      Q3: '1200',
      Q4: '1350',
    },
  },
  {
    chartId: 2,
    rowData: {
      Group: 'Group F',
      Q1: '2300',
      Q2: '2350',
      Q3: '2300',
      Q4: '2300',
    },
  },
  {
    chartId: 2,
    rowData: {
      Group: 'Group G',
      Q1: '1200',
      Q2: '1380',
      Q3: '1480',
      Q4: '1600',
    },
  },
  {
    chartId: 2,
    rowData: {
      Group: 'Group H',
      Q1: '1000',
      Q2: '1070',
      Q3: '1170',
      Q4: '1130',
    },
  },
  {
    chartId: 3,
    rowData: {
      Group: 'Group I',
      Q1: '1050',
      Q2: '1100',
      Q3: '1200',
      Q4: '1350',
    },
  },
  {
    chartId: 3,
    rowData: {
      Group: 'Group G',
      Q1: '2300',
      Q2: '2350',
      Q3: '2300',
      Q4: '2300',
    },
  },
  {
    chartId: 3,
    rowData: {
      Group: 'Group K',
      Q1: '1200',
      Q2: '1380',
      Q3: '1480',
      Q4: '1600',
    },
  },
  {
    chartId: 3,
    rowData: {
      Group: 'Group L',
      Q1: '1000',
      Q2: '1070',
      Q3: '1170',
      Q4: '1130',
    },
  },
];

// const data2 =
//   {
//     chartId: 2,
//     rowData: [
//       { Group: 'Group A', Q1: '1000', Q2: '1100', Q3: '1200', Q4: '1300' },
//       { Group: 'Group B', Q1: '2250', Q2: '2350', Q3: '2300', Q4: '2250' },
//       { Group: 'Group C', Q1: '1280', Q2: '1380', Q3: '1480', Q4: '1580' },
//       { Group: 'Group D', Q1: '970', Q2: '1070', Q3: '1170', Q4: '1270' },
//     ],
//   },

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );

  await Promise.all(
    charts.map((chart) => {
      return Chart.create(chart);
    })
  );

  await Promise.all(
    data1.map((data) => {
      return RowData.create(data);
    })
  );

  console.log(`seeded ${users.length} Users`);
  console.log(`seeded ${charts.length} Charts`);
  console.log(`seeded ${data1.length} rowDatas`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
