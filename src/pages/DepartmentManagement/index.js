import React, { useEffect, useState } from 'react';
import accountService from '../../service/account';
import departmentService from '../../service/department';
import TableComponent from '../../components/TableComponent'
import { generatePath, useHistory } from 'react-router-dom';

const headCells = [
    // { id: 'id', numeric: true, disablePadding: false, label: 'id' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Tên' },
    // { id: 'discription', numeric: false, disablePadding: false, label: 'Mô tả' },
    { id: 'userId', numeric: false, disablePadding: false, type: 'select', label: 'Trưởng ban', data: [] },
];

function DepartmentManagement() {

    let [list, setList] = useState([])
    let [users, setUsers] = useState([])
    let history = useHistory()

    useEffect(async () => {
        let data = await accountService.get()
        setUsers(data.data)

        let f = headCells.find(e => e.id === 'userId')
        if(f){
            f.data = data.data.map(e => ({ value: e.id, label: e.fullname }))
        }

        setList(await departmentService.getDepartment())
    }, [])



    function _rowClickHandle(row) {
        history.push(generatePath('/department/:id', row))
    }

    return <TableComponent title="Phòng ban" rowClickHandle={_rowClickHandle} header={headCells} data={list} />;

}

export default DepartmentManagement
