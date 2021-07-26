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

    console.log(accountingCount, financeCount, itCount);

    let mapData = data.map((item) => {
      let container = {};

      let department = "department";
      let efficiency = "efficiency";
      container[department] = item.department;
      container[efficiency] = item.efficiency;

      console.log(container);
    });
  }

  console.log(getDepartmentEfficiency(getData));
  return <div></div>;
}
