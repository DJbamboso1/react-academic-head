import React, { useEffect, useState } from 'react';
import teacherService from '../../service/teacher';
import TableComponent from '../../components/TableComponent'
import { generatePath, useHistory } from 'react-router-dom';


const headCells = [
  { id: 'id', numeric: true, disablePadding: true, label: 'Code' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Họ và tên' },
  { id: 'departmentId', numeric: true, disablePadding: false, label: 'Mã phòng ban' },
  { id: 'lectureType', numeric: true, disablePadding: false, label: 'Loại giảng viên' },
  { id: 'minCourse', numeric: true, disablePadding: false, label: 'Min' },
  { id: 'maxCourse', numeric: true, disablePadding: false, label: 'Max' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Trạng thái' },
];


export default function Teacher() {

  let [list, setList] = useState([])
  let history = useHistory()

  useEffect(async () => {
    setList(await teacherService.get())
  }, [])

  function _rowClickHandle(row){
    history.push(generatePath('/teacher/:id', row))
  }

  return <TableComponent title="Giảng viên" rowClickHandle={_rowClickHandle} header={headCells} data={list.map(e => ({ ...e, status: e.status === 1 ? 'Đang dạy' : 'Đã nghĩ' }))} />;
}
