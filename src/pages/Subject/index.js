import React, { useEffect, useState, useContext } from 'react';
// import teacherService from '../../service/teacher';
import subjectService from '../../service/subject';
import TableComponent from '../../components/TableComponent'
import { Context } from '../../App';
import { Redirect } from 'react-router';
import { generatePath, useHistory } from 'react-router-dom'
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close';

const headCells = [
  // { id: 'subjectId', numeric: true, disablePadding: true, label: 'Id' },
  { id: 'subjectName', numeric: true, disablePadding: false, label: 'Tên môn' },
  { id: 'subjectCode', numeric: true, disablePadding: false, label: 'Mã môn' },
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

export default function Subject() {
  const classes = useStyles();
  let [list, setList] = useState([])
  let history = useHistory()
  const [open, setOpen] = React.useState(false)

  

  useEffect(async () => {
    setList(await subjectService.get())
  }, [])
  let { auth } = useContext(Context);

  function _rowClickHandle(row) {
    history.push(generatePath('/subject/:id', row))
  }

  if (!auth.login) return <Redirect to="/login" />
  return <TableComponent title="Môn học" header={headCells} rowClickHandle={_rowClickHandle} data={list.map(e => ({ ...e, status: e.status === 1 ? 'Còn dạy' : 'Đã xóa' }))} >
    <form autoComplete="off">
      <Typography variant="h5">Mã môn</Typography>
      <TextField id="standard-basic" label="Mã môn" variant="outlined" className={classes.textField} /><br />
      <Typography variant="h5">Tên môn</Typography>
      <TextField id="filled-basic" label="Tên môn" variant="outlined" className={classes.textField} /><br />
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      <div className={classes.btnGroup}>
        {/* <Button variant="contained" className={classes.btn} color="secondary"><CloseIcon /></Button> */}
        <Button variant="contained" className={classes.btn} color="primary">Thêm</Button>
      </div>

    </form>
  </TableComponent>;
}
