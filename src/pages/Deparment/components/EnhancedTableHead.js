import React from "react";

import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";


const headCells = [
  
  { id: "subjectCode", numeric: false, disablePadding: false, label: "Mã môn" },
  { id: "subjectName", numeric: false, disablePadding: false, label: "Tên môn" },
  
];

const styles = {
  rowHead: { fontSize: 20, fontWeight: 'bold', color: 'white', width: 250 }
}

function EnhancedTableHead(props) {
  const {
      classes,
      order,
      orderBy,
      onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
  };

  return (
      <TableHead>
          <TableRow style={{ backgroundColor: '#3f51b5', }}>
              <TableCell style={{width: 250}}/>
              {headCells.map((headCell) => (
                  <TableCell
                      style={styles.rowHead}
                      key={headCell.id}
                      align={"left"}
                      padding={headCell.disablePadding ? "none" : "default"}
                      sortDirection={orderBy === headCell.id ? order : false}
                  >
                      <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : "asc"}
                          onClick={createSortHandler(headCell.id)}
                      >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                              <span className={classes.visuallyHidden}>
                                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                              </span>
                          ) : null}
                      </TableSortLabel>
                  </TableCell>
              ))}
          </TableRow>
      </TableHead>
  );
}

export default EnhancedTableHead;