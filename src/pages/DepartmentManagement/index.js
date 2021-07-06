import React, { useEffect, useState } from 'react';
import accountService from '../../service/account';
import departmentService from '../../service/department';
import TableComponent from '../../components/TableComponent'
import { generatePath, useHistory } from 'react-router-dom';

const headCells = [
    { id: 'id', numeric: true, disablePadding: false, label: 'id' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Tên' },
    // { id: 'discription', numeric: false, disablePadding: false, label: 'Mô tả' },
    { id: 'userId', numeric: false, disablePadding: false, label: 'Trưởng ban' },
];

function DepartmentManagement() {

    let [list, setList] = useState([])
    let history = useHistory()

    useEffect(async () => {
        setList(await departmentService.getDepartment())
    }, [])

    

    function _rowClickHandle(row) {
        history.push(generatePath('/department/:id', row))
    }

    return <TableComponent title="Phòng ban" rowClickHandle={_rowClickHandle} header={headCells} data={list.map(e => ({ ...e }))} />;

}

export default DepartmentManagement
