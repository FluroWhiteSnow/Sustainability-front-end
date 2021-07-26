import React from "react";
import bg1 from "./assets/bg-1.PNG";
import bg2 from "./assets/bg-2.PNG";
import bg3 from "./assets/bg-3.PNG";
import bg4 from "./assets/bg-4.PNG";
import bg5 from "./assets/bg-5.PNG";
import bg6 from "./assets/bg-6.PNG";
import "../stylesheets/App.css";

export default function TreeCard(props) {
  let data =
    props.co2Totals.coffee_cups_co2_total +
    props.co2Totals.drive_co2_total +
    props.co2Totals.reusable_cups_co2_total +
    props.co2Totals.walk_co2_total;

  console.log(data);

  //   let data = 45;

  if (!(data > 50) && data < 51) {
    return (
      <div className="tree-container">
        <img src={bg1} minWidth="400" height="200" />
      </div>
    );
  } else if (!(data > 100) && data < 101) {
    return (
      <div>
        <img src={bg2} minWidth="400" height="200" />
      </div>
    );
  } else if (!(data > 150) && data < 151) {
    return (
      <div>
        <img src={bg3} minWidth="400" height="200" />
      </div>
    );
  } else if (!(data > 200) && data < 201) {
    return (
      <div>
        <img src={bg4} minWidth="" height="200" />
      </div>
    );
  } else if (!(data > 250) && data < 251) {
    return (
      <div>
        <img src={bg5} />
      </div>
    );
  } else {
    return <img src={bg6} className="tree-img" />;
  }
}
