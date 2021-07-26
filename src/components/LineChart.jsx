import React, { ReactDOM } from "react";
import getUserEfficiency from "./GetUserEfficiency";

export default function LineChart(props) {
  let getData = getUserEfficiency(props);

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

    // console.log(accountingCount, financeCount, itCount);

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
        // let sum = item.reduce((a, { efficiency }) => a + efficiency, 0);

        return container;
      }

      return container;
      // console.log(container);
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
      if (mapData[i].department === "Finance") {
        departmentEfficiencyCalc.financeEfficiency += parseInt(
          mapData[i].efficiency
        );
        departmentEfficiencyCalc.financeCount += 1;
      } else if (mapData[i].department === "IT") {
        departmentEfficiencyCalc.itEfficiency += parseInt(
          mapData[i].efficiency
        );
        departmentEfficiencyCalc.itCount += 1;
      } else if (mapData[i].department === "Accounting") {
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
    };
    console.log(efficiency);

    console.log(departmentEfficiencyCalc);
    return mapData;
  }
  console.log(props);
  console.log(getDepartmentEfficiency(getData));
  return <div></div>;
}
