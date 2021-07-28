export default function getUserEfficiency(props) {
  const userData = props.users;
  const cO2DailyData = props.userCo2Dalies;
  const userCo2Data = props.co2Totals;
  const cupsTotal = props.cupsTotal;

  const mappedUserData = userData.map((item) => {
    const container = {};

    const name = "name";
    const id = "id";
    const department = "department";
    const efficiency = "efficiency";
    const distance = "distance";
    container[id] = item.id;
    container[name] = `${item.first_name} ${item.last_name}`;
    container[department] = item.department_code;
    container[efficiency] = 0;
    container[distance] = item.distance_from_work;

    return container;
  });

  const co2DailyIds = cO2DailyData.map((item) => {
    let array = item.user_co2_total_id;
    return array;
  });

  const mappedcO2total = userCo2Data.map((item) => {
    const container = { ...item };
    const id = "id";
    const driveWalk = "driveDividedWalk";
    const co2DailyCount = "co2DailyCount";
    container[id] = item.id;
    container[driveWalk] = item.pt_co2_total + item.walk_co2_total;
    container[co2DailyCount] = 0;

    return container;
  });

  const mergedDatas = mappedcO2total.map((item) => {
    const container = { ...item };

    for (let i = 0; i < co2DailyIds.length; i++) {
      if (container.id === co2DailyIds[i]) {
        container.co2DailyCount++;
      }
    }

    mappedUserData.map((item) => {
      let timesCountWalk =
        container.driveDividedWalk /
        (150 * (container.co2DailyCount * item.distance));
      const name = "timesCountWalk";

      container[name] = timesCountWalk;
    });
    return container;
  });

  const mappedCupsTotal =
    cupsTotal &&
    cupsTotal.map((item) => {
      const container = {};
      const id = "id";
      const reuasbleDividedCoffee = "reuasbleDividedCoffee";
      let cupsEfficiancy = item.reusable_cups_total / item.coffee_cups_total;

      if (isNaN(cupsEfficiancy) || cupsEfficiancy === Infinity) {
        cupsEfficiancy = 1;
      }
      container[id] = item.id;
      container[reuasbleDividedCoffee] = cupsEfficiancy;
      return container;
    });

  const efficiency = mappedCupsTotal.map((item) => {
    const container = {};

    mergedDatas.map((item2) => {
      const id = "id";
      const value = "value";

      if (item.id === item2.id) {
        let effiencyValue = item.reuasbleDividedCoffee + item2.timesCountWalk;
        container[id] = item.id;
        container[value] = effiencyValue;
      }
    });
    return container;
  });

  const data = mappedUserData.map((item) => {
    const container = { ...item };

    efficiency.map((item2) => {
      if (item.id === item2.id) {
        let sum = container.efficiency + (item2.value / 2) * 100;
        let n = sum.toFixed(2);
        container.efficiency = n;
      }
    });
    return container;
  });

  data.sort((a, b) => parseFloat(b.efficiency) - parseFloat(a.efficiency));
  return data;
}
