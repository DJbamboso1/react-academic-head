import React, { useEffect, useState } from 'react';
import accountService from '../../service/account';
import TableComponent from '../../components/TableComponent'
import { generatePath, useHistory } from 'react-router-dom';

const headCells = [
    { id: 'id', numeric: true, disablePadding: true, label: 'id' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Tài khoản' },
    { id: 'password', numeric: false, disablePadding: false, label: 'Mật khẩu' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Mail' },
    { id: 'gender', numeric: false, disablePadding: false, label: 'Giới tính' },
    { id: 'avatarLink', numeric: false, disablePadding: false, label: 'Hình ảnh' },
    { id: 'roleId', numeric: true, disablePadding: false, label: 'Vai trò' },
];

function AccountManagement() {

    let [list, setList] = useState([])
    let history = useHistory()

    useEffect(async () => {
        setList(await accountService.get())
    }, [])

    console.log("account service: " + accountService.get())
    console.log("list account: " + list)

    function _rowClickHandle(row) {
        history.push(generatePath('/account/:id', row))
    }

    return <TableComponent title="Tài khoản" rowClickHandle={_rowClickHandle} header={headCells} data={list.map(e => ({ ...e, gender: e.gender === "m" ? 'Nam' : 'Nữ' }))} />;

}

export default AccountManagement
