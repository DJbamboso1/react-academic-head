import React, { useEffect, useState, useContext } from 'react';
// import teacherService from '../../service/teacher';
import subjectService from '../../service/subject';
import TableComponent from '../../components/TableComponent'
import { Context } from '../../App';
import { Redirect } from 'react-router';
import { generatePath, useHistory } from 'react-router-dom'

const headCells = [
  // { id: 'subjectId', numeric: true, disablePadding: true, label: 'Id' },
  { id: 'subjectName', numeric: true, disablePadding: false, label: 'Tên môn' },
  { id: 'subjectCode', numeric: true, disablePadding: false, label: 'Mã môn' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Trạng thái' },
];


export default function Subject() {

  let [list, setList] = useState([])
  let history = useHistory()

  useEffect(async () => {
    setList(await subjectService.get())
  }, [])
  let { auth } = useContext(Context);

  function _rowClickHandle(row) {
    history.push(generatePath('/subject/:id', row))
  }

  if (!auth.login) return <Redirect to="/login" />
  return <TableComponent title="Môn học" header={headCells} rowClickHandle={_rowClickHandle} data={list.map(e => ({ ...e, status: e.status === 1 ? 'Còn dạy' : 'Đã xóa' }))} />;
}
