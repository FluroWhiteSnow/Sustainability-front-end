import React from "react";
import { useState } from "react";
import MaterialTable from "material-table";
import getUserEfficiency from "./GetUserEfficiency";

export default function LeaderBoard(props) {
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Department", field: "department" },
    { title: "Efficiency", field: "efficiency" },
  ];

  let data = getUserEfficiency(props).slice(0, 6);

  return (
    <div style={{ minWidth: "100%" }}>
      <MaterialTable
        style={{ minWidth: "100%" }}
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
          padding: "dense",

          rowStyle: {
            fontSize: 14,
          },
        }}
      />
    </div>
  );
}
