import React from "react";
import { useState } from "react";
import MaterialTable from "material-table";
import getUserEfficiency from "./GetUserEfficiency";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

export default function LeaderBoard(props) {
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Department", field: "department" },
    { title: "Efficiency", field: "efficiency" },
  ];

  let data = getUserEfficiency(props).slice(0, 6);

  console.log(data);

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

          // rowStyle: (rowData) => ({
          //   backgroundColor:
          //     selectedRow === rowData.tableData.id ? "#67aeae" : "#FFF",
          // }),
        }}
      />
    </div>
  );
}
