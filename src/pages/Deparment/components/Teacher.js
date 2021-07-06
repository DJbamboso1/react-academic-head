import { TableCell, TableRow, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import ClearIcon from '@material-ui/icons/Clear';

export default function Teacher({ lecId, lecName, lecType, lecStatus, lecRating }) {

    const [rating, setRating] = useState(lecRating);
    let [update, setUpdate] = useState(false)
    const [oldRating, setOldRating] = useState(lecRating);

    function updateHandle(){
        setUpdate(false)
    }

    function cancelHandle() {
        setUpdate(false);
        setRating(oldRating);
    }


    return (
        <TableRow key={lecId}>

            <TableCell>{lecName}</TableCell>
            <TableCell>{lecType}</TableCell>
            <TableCell align="left">{lecStatus}</TableCell>
            <TableCell>
                <Rating
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue)
                        setUpdate(true)
                    }}
                />
            </TableCell>
            <TableCell>
                {
                    update && <>
                    <Button variant="contained" color="primary" style={{margin: 10}} onClick={updateHandle}>Cập nhật</Button>
                    <Button variant="contained" color="primary" style={{margin: 10}} onClick={cancelHandle}><ClearIcon/></Button>
                    </>
                }
            </TableCell>

        </TableRow>
    )
}
