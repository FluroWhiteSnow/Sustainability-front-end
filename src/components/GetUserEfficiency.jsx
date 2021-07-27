export default function getUserEfficiency(props) {
  let userData = props.users;
  let cO2DailyData = props.userCo2Dalies;
  let userCo2Data = props.co2Totals;
  let cupsTotal = props.cupsTotal;
  console.log(cO2DailyData);

  let mappedUserData = userData.map((item) => {
    const container = {};

    let name = "name";
    let id = "id";
    let department = "department";
    let efficiency = "efficiency";
    let distance = "distance";
    container[id] = item.id;
    container[name] = `${item.first_name} ${item.last_name}`;
    container[department] = item.department_code;
    container[efficiency] = 0;
    container[distance] = item.distance_from_work;
    // console.log(container);

    return container;
  });

  let co2DailyIds = cO2DailyData.map((item) => {
    let array = item.user_co2_total_id;
    return array;
  });

  let mappedcO2total = userCo2Data.map((item) => {
    const container = { ...item };
    let id = "id";
    let driveWalk = "driveDividedWalk";
    let co2DailyCount = "co2DailyCount";

    container[id] = item.id;
    container[driveWalk] = item.pt_co2_total + item.walk_co2_total;
    // console.log(item);

    container[co2DailyCount] = 0;

    return container;
  });

  // console.log(mappedcO2total);

  let mergedDatas = mappedcO2total.map((item) => {
    const container = { ...item };

    for (let i = 0; i < co2DailyIds.length; i++) {
      if (container.id === co2DailyIds[i]) {
        container.co2DailyCount++;
      }
    }

    let distanceMap = mappedUserData.map((item) => {
      let timesCountWalk =
        container.driveDividedWalk /
        (150 * (container.co2DailyCount * item.distance));
      let name = "timesCountWalk";

      container[name] = timesCountWalk;
    });

    return container;
  });

  let mappedCupsTotal =
    cupsTotal &&
    cupsTotal.map((item) => {
      const container = {};
      let id = "id";
      let reuasbleDividedCoffee = "reuasbleDividedCoffee";

      let cupsEfficiancy = item.reusable_cups_total / item.coffee_cups_total;
      // console.log(cupsEfficiancy);

      if (isNaN(cupsEfficiancy) || cupsEfficiancy === Infinity) {
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

  // console.log(data);
  return data;
}
