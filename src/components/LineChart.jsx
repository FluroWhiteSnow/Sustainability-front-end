import React, { ReactDOM } from "react";
import getUserEfficiency from "./GetUserEfficiency";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function LineChart(props) {
  let getData = getUserEfficiency(props);

  const [graphData, setGraphData] = useState([]);

  function getDepartmentEfficiency(data) {
    let accountingCount = data.reduce(function (n, item) {
      return n + (item.department == "Accounting");
    }, 0);

    let financeCount = data.reduce(function (n, item) {
      return n + (item.department == "Finance");
    }, 0);

    let itCount = data.reduce(function (n, item) {
      return n + (item.department == "IT");
    }, 0);

    let mapData = data.map((item) => {
      let container = {};

      let department = "department";
      let efficiency = "efficiency";
      let count = "count";
      let efficiencyTotal = "efficiencyTotal";

      container[department] = item.department;
      container[efficiency] = item.efficiency;
      container[count] = 0;
      container[efficiencyTotal] = 0;

      if (container.department === "Accounting") {
        container[count] = accountingCount;
      } else if (container.department === "IT") {
        container[count] = itCount;
      } else if (container.department === "Finance") {
        container[count] = financeCount;
        return container;
      }

      return container;
    });

    let departmentEfficiencyCalc = {
      itEfficiency: 0,
      itCount: 0,
      accoutningEfficiency: 0,
      accountingCount: 0,
      financeEfficiency: 0,
      financeCount: 0,
    };

    for (let i = 0; i < mapData.length; i++) {
      if (
        mapData[i].department === "Finance" &&
        !isNaN(mapData[i].efficiency)
      ) {
        departmentEfficiencyCalc.financeEfficiency += parseInt(
          mapData[i].efficiency
        );
        departmentEfficiencyCalc.financeCount += 1;
      } else if (
        mapData[i].department === "IT" &&
        !isNaN(mapData[i].efficiency)
      ) {
        departmentEfficiencyCalc.itEfficiency += parseInt(
          mapData[i].efficiency
        );
        departmentEfficiencyCalc.itCount += 1;
      } else if (
        mapData[i].department === "Accounting" &&
        !isNaN(mapData[i].efficiency)
      ) {
        departmentEfficiencyCalc.accoutningEfficiency += parseInt(
          mapData[i].efficiency
        );
        departmentEfficiencyCalc.accountingCount += 1;
      }
    }

    let efficiency = {
      iT:
        departmentEfficiencyCalc.itEfficiency /
        departmentEfficiencyCalc.itCount,
      accounting:
        departmentEfficiencyCalc.accoutningEfficiency /
        departmentEfficiencyCalc.accountingCount,
      finance:
        departmentEfficiencyCalc.financeEfficiency /
        departmentEfficiencyCalc.financeCount,
    };

    setGraphData(efficiency);
    return efficiency;
  }

  useEffect(() => {
    getDepartmentEfficiency(getData);
  }, [props]);

  return (
    <div
      style={{
        width: "90%",
        maxWidth: 700,
        maxHeight: 800,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Bar
        data={{
          labels: ["Accounting", "Finance", "IT"],
          datasets: [
            {
              label: "Department Efficiency Rating",
              data: [graphData.accounting, graphData.finance, graphData.iT],

              backgroundColor: ["#e66465", "#9198e5", "#F0E68C"],

              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{ indexAxis: "y" }}
        height={"100%"}
        width={"fitConent"}
      ></Bar>
    </div>
  );
}
