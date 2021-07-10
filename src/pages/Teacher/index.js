import React, { useEffect, useState } from 'react';
import teacherService from '../../service/teacher';
import TableComponent from '../../components/TableComponent'
import { generatePath, useHistory } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const headCells = [
  { id: 'id', numeric: true, disablePadding: true, label: 'Code' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Họ và tên' },
  { id: 'departmentId', numeric: true, disablePadding: false, label: 'Mã phòng ban' },
  { id: 'lectureType', numeric: true, disablePadding: false, label: 'Loại giảng viên' },
  { id: 'minCourse', numeric: true, disablePadding: false, label: 'Min' },
  { id: 'maxCourse', numeric: true, disablePadding: false, label: 'Max' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Trạng thái' },
];

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "90%",
    margin: "20px 0px",
  },

  // btnGroup: {
  //   float: 'right'
  // },

  btn: {
    // marginRight: "10%"
  }
}))

export default function Teacher() {
  const classes = useStyles();
  let [list, setList] = useState([])
  let history = useHistory()

  useEffect(async () => {
    setList(await teacherService.get())
  }, [])

  function _rowClickHandle(row){
    history.push(generatePath('/teacher/:id', row))
  }

  return <TableComponent title="Giảng viên" rowClickHandle={_rowClickHandle} header={headCells} data={list.map(e => ({ ...e, status: e.status === 1 ? 'Đang dạy' : 'Đã nghĩ' }))}>
    <form autoComplete="off">
      <Typography variant="h5">Mã giảng viên</Typography>
      <TextField id="standard-basic" label="Mã giảng viên" variant="outlined" className={classes.textField} /><br />
      <Typography variant="h5">Tên giảng viên</Typography>
      <TextField id="filled-basic" label="Tên giảng viên" variant="outlined" className={classes.textField} /><br />
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      <div className={classes.btnGroup}>
        {/* <Button variant="contained" className={classes.btn} color="secondary"><CloseIcon /></Button> */}
        <Button variant="contained" className={classes.btn} color="primary">Thêm</Button>
      </div>

    </form>
    </TableComponent>;
}
