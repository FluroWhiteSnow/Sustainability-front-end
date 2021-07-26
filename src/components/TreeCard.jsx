import React from "react";
import bg1 from "./assets/bg-1.PNG";
import bg2 from "./assets/bg-2.PNG";
import bg3 from "./assets/bg-3.PNG";
import bg4 from "./assets/bg-4.PNG";
import bg5 from "./assets/bg-5.PNG";
import bg6 from "./assets/bg-6.PNG";

export default function TreeCard(props) {
  //   let data = props.co2Totals;
  //   console.log(data);
  //   console.log(localStorage);

  let data = 45;

  console.log(localStorage.getItem("username"));

  if (!(data > 50) && data < 51) {
    return (
      <div>
        <img src={bg1} width="400" height="200" />
      </div>
    );
  } else if (!(data > 100) && data < 101) {
    return (
      <div>
        <img src={bg2} width="400" height="200" />
      </div>
    );
  } else if (!(data > 150) && data < 151) {
    return (
      <div>
        <img src={bg3} width="400" height="200" />
      </div>
    );
  } else if (!(data > 200) && data < 201) {
    return (
      <div>
        <img src={bg4} width="400" height="200" />
      </div>
    );
  } else if (!(data > 250) && data < 251) {
    return (
      <div>
        <img src={bg5} width="400" height="200" />
      </div>
    );
  } else {
    return (
      <div>
        <img src={bg6} width="400" height="200" />
      </div>
    );
  }
}
