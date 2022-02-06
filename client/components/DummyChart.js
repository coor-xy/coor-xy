import React from "react";
import charts from "./chartComponents";
const { BarComp, SimpleAreaComp, SimpleScatterComp, LineComp } = charts;

const dummyConfig = {
  width: 500,
  height: 400,
  xLabel: "",
  yLabel: "",
  legend: false,
  title: "",
  grid: false,
};

const dummyDataGrouped = [
  {
    Group: "Group A",
    Q1: "1000",
    Q2: "1100",
    Q3: "1200",
    Q4: "1300",
  },
  {
    Group: "Group B",
    Q1: "2250",
    Q2: "2350",
    Q3: "2300",
    Q4: "2250",
  },
  {
    Group: "Group C",
    Q1: "1280",
    Q2: "1380",
    Q3: "1480",
    Q4: "1580",
  },
  {
    Group: "Group D",
    Q1: "970",
    Q2: "1070",
    Q3: "1170",
    Q4: "1270",
  },
];

const dummyDataQuant = [
  {
    PriceDemand: "100",
    PriceSupply: "10",
    Quantity: "0",
    CompanyEarnings: "0.70",
    SalesTeamBonus: "0.50",
  },
  {
    PriceDemand: "80",
    PriceSupply: "20",
    Quantity: "15",
    CompanyEarnings: "0.80",
    SalesTeamBonus: "0.60",
  },
  {
    PriceDemand: "60",
    PriceSupply: "40",
    Quantity: "30",
    CompanyEarnings: "0.95",
    SalesTeamBonus: "0.80",
  },
  {
    PriceDemand: "40",
    PriceSupply: "60",
    Quantity: "45",
    CompanyEarnings: "1.00",
    SalesTeamBonus: "1.00",
  },
  {
    PriceDemand: "20",
    PriceSupply: "80",
    Quantity: "60",
    CompanyEarnings: "1.05",
    SalesTeamBonus: "1.15",
  },
  {
    PriceDemand: "10",
    PriceSupply: "100",
    Quantity: "80",
    CompanyEarnings: "1.10",
    SalesTeamBonus: "1.25",
  },
];

const DummyChart = (props) => {
  const { type } = props;

  return (
    <div>
      {type === "Bar" && (
        <BarComp
          data={dummyDataGrouped}
          primaryColumn={"Group"}
          valueColumns={[
            { name: "Q1", color: "#fda25a" },
            { name: "Q2", color: "#74bdb4" },
            { name: "Q3", color: "#8067f5" },
            { name: "Q4", color: "#e6837d" },
          ]}
          width={dummyConfig.width}
          height={dummyConfig.height}
          xLabel={dummyConfig.xLabel}
          yLabel={dummyConfig.yLabel}
          legend={dummyConfig.legend}
          title={dummyConfig.title}
          grid={dummyConfig.grid}
        />
      )}
      {type === "Scatter" && (
        <SimpleScatterComp
          data={dummyDataQuant}
          primaryColumn={"CompanyEarnings"}
          valueColumns={[{ name: "SalesTeamBonus", color: "#e6837d" }]}
          width={dummyConfig.width}
          height={dummyConfig.height}
          xLabel={dummyConfig.xLabel}
          yLabel={dummyConfig.yLabel}
          legend={dummyConfig.legend}
          title={dummyConfig.title}
          grid={dummyConfig.grid}
        />
      )}
      {type === "Area" && (
        <SimpleAreaComp
          data={dummyDataGrouped}
          primaryColumn={"Group"}
          valueColumns={[
            { name: "Q1", color: "#fda25a" },
            { name: "Q2", color: "#74bdb4" },
            { name: "Q3", color: "#8067f5" },
            { name: "Q4", color: "#e6837d" },
          ]}
          width={dummyConfig.width}
          height={dummyConfig.height}
          xLabel={dummyConfig.xLabel}
          yLabel={dummyConfig.yLabel}
          legend={dummyConfig.legend}
          title={dummyConfig.title}
          grid={dummyConfig.grid}
        />
      )}
      {type === "Line" && (
        <LineComp
          data={dummyDataQuant}
          primaryColumn={"Quantity"}
          valueColumns={[
            { name: "PriceDemand", color: "#e6837d" },
            { name: "PriceSupply", color: "#74bdb4" },
          ]}
          width={dummyConfig.width}
          height={dummyConfig.height}
          xLabel={dummyConfig.xLabel}
          yLabel={dummyConfig.yLabel}
          legend={dummyConfig.legend}
          title={dummyConfig.title}
          grid={dummyConfig.grid}
        />
      )}
    </div>
  );
};

export default DummyChart;