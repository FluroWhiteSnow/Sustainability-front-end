import React, { ReactDOM } from "react";
import getUserEfficiency from "./GetUserEfficiency";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

// const domContainer = document.querySelector("#app");
// ReactDOM.render(React.createElement(ApexChart), domContainer);

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
        (departmentEfficiencyCalc.itEfficiency /
          departmentEfficiencyCalc.itCount) *
        100,
      accounting:
        (departmentEfficiencyCalc.accoutningEfficiency /
          departmentEfficiencyCalc.accountingCount) *
        100,
      finance:
        (departmentEfficiencyCalc.financeEfficiency /
          departmentEfficiencyCalc.financeCount) *
        100,
    };
    // console.log(efficiency);

    // let graphObject = {
    //   series: [
    //     {
    //       data: [efficiency.iT, efficiency.accoutning, efficiency.finance],
    //     },
    //   ],
    //   options: {
    //     chart: {
    //       type: "bar",
    //       height: 350,
    //     },
    //     plotOptions: {
    //       bar: {
    //         borderRadius: 4,
    //         horizontal: true,
    //       },
    //     },
    //     dataLabels: {
    //       enabled: false,
    //     },
    //     xaxis: {
    //       categories: ["IT", "Accounting", "Finance"],
    //     },
    //   },
    // };

    setGraphData(efficiency);
    // setGraphData(graphObject);
    return efficiency;
  }

  useEffect(() => {
    getDepartmentEfficiency(getData);
  }, []);

  console.log(graphData);
  const options = {
    indexAxis: "y",
  };
  // console.log(getDepartmentEfficiency(getData));
  return (
    <div>
      <Bar
        data={{
          labels: ["Accounting", "Finance", "IT"],
          datasets: [
            {
              label: "Department Efficiency Rating",
              data: [graphData.accounting, graphData.finance, graphData.iT],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{ indexAxis: "y" }}
        height={400}
        width={600}
      ></Bar>
    </div>
  );
}
