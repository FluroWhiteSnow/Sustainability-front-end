import React from "react";
import { useState } from "react";
import MaterialTable from "material-table";

export default function LeaderBoard(props) {
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Department", field: "department" },
    { title: "Efficiency", field: "efficiency" },
  ];

  function getData(props) {
    let userData = props.users;
    let cO2DailyData = props.userCo2Dalies;
    let userCo2Data = props.co2Totals;
    let cupsTotal = props.cupsTotal;

    let mappedUserData = userData.map((item) => {
      const container = {};

      let name = "name";
      let id = "id";
      let department = "department";
      let efficiency = "efficiency";
      container[id] = item.id;
      container[name] = `${item.first_name} ${item.last_name}`;
      container[department] = item.department_code;
      container[efficiency] = 0;

      return container;
    });

    let co2DailyIds = cO2DailyData.map((item) => {
      let array = item.user_co2_total_id;
      return array;
    });

    let mappedcO2total = userCo2Data.map((item) => {
      const container = {};

      let id = "id";
      let driveWalk = "driveDividedWalk";
      let co2DailyCount = "co2DailyCount";

      container[id] = item.id;
      container[driveWalk] = (item.pt_co2_total + item.walk_co2_total) / 150;
      container[co2DailyCount] = 0;

      return container;
    });

    let mergedDatas = mappedcO2total.map((item) => {
      const container = { ...item };

      for (let i = 0; i < co2DailyIds.length; i++) {
        if (container.id === co2DailyIds[i]) {
          container.co2DailyCount++;
        }
      }
      let timesCountWalk = container.driveDividedWalk * container.co2DailyCount;
      let name = "timesCountWalk";
      container[name] = timesCountWalk;

      return container;
    });

    let mappedCupsTotal = cupsTotal.map((item) => {
      const container = {};
      let id = "id";
      let reuasbleDividedCoffee = "reuasbleDividedCoffee";

      let cupsEfficiancy = item.coffee_cups_total / item.reusable_cups_total;

      if (cupsEfficiancy === 0 || cupsEfficiancy === Infinity) {
        cupsEfficiancy = 0;
      }
      container[id] = item.id;
      container[reuasbleDividedCoffee] = cupsEfficiancy;
      return container;
    });

    let efficiency = mappedCupsTotal.map((item) => {
      let container = {};

      let effiency2 = mergedDatas.map((item2) => {
        let id = "id";
        let value = "value";

        if (item.id === item2.id) {
          let effiencyValue = item.reuasbleDividedCoffee + item2.timesCountWalk;
          container[id] = item.id;
          container[value] = effiencyValue;
        }
      });
      return container;
    });

    let data = mappedUserData.map((item) => {
      let container = { ...item };

      let efficiantMap = efficiency.map((item2) => {
        if (item.id === item2.id) {
          let sum = container.efficiency + item2.value;
          let n = sum.toFixed(2);
          container.efficiency = n;
        }
      });
      return container;
    });

    data.sort((a, b) => parseFloat(b.efficiency) - parseFloat(a.efficiency));

    return data;
  }

  let data = getData(props);
  console.log(data);

  return (
    <div style={{ minWidth: 800 }}>
      <MaterialTable
        columns={columns}
        data={data}
        title="User Efficiency Rating"
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        options={{
          search: false,
          showFirstLastPageButtons: false,
          paging: false,
          pageSize: 5,
          sorting: false,
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#67aeae" : "#FFF",
          }),
        }}
      />
    </div>
  );
}
