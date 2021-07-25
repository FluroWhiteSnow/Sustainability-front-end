import React from "react";

export default function LeaderBoard(props) {
  const getData = (props) => {
    let userData = props.users;
    let cO2DailyData = props.userCo2Dalies;
    // let userCo2Data = props.co2Totals;
    // console.log(props);

    let mappedUserData = userData.map((item) => {
      const container = {};

      let name = "name";
      let id = "id";
      let department = "department";
      let co2DailyCount = "co2DailyCount";
      container[id] = item.id;
      container[name] = `${item.first_name} ${item.last_name}`;
      container[department] = item.department_code;
      container[co2DailyCount] = 0;

      return container;
    });

    let co2DailyIds = cO2DailyData.map((item) => {
      let array = item.user_co2_total_id;
      return array;
    });

    let mergedDatas = mappedUserData.map((item) => {
      const container = { ...item };
      console.log(container.co2DailyCount);

      for (let i = 0; i < co2DailyIds.length; i++) {
        if (container.id === co2DailyIds[i]) {
          container.co2DailyCount++;
        }
      }
      console.log(container.co2DailyCount);
      return container;
    });

    // return co2DailyIds;
    return mergedDatas;

    // let mappedCo2Data = userCo2Data.map((item) => {
    //   const container ={}
    //   let id ="user_id"
    //   let
    // })
  };

  console.log(getData(props));

  return <div style={{ maxWidth: "100%" }}></div>;
}
