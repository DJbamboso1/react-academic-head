import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Rating } from '@material-ui/lab';
import StarIcon from '@material-ui/icons/Star';
import Teacher from './Teacher';
import RemoveIcon from '@material-ui/icons/Remove';
import UpdateIcon from '@material-ui/icons/Update';


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


export default function Subjects({ registerLecturers, status, subjectCode, subjectId, subjectName }) {

    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();


    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {subjectCode}
                </TableCell>
                <TableCell align="left">{subjectName}</TableCell>

                

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" style={{ fontWeight: 'bold' }} gutterBottom component="div">
                                Gi???ng vi??n:
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {/* <TableCell>Date</TableCell> */}
                                        <TableCell>T??n</TableCell>
                                        <TableCell align="left">Lo???i gi???ng vi??n</TableCell>
                                        <TableCell align="left">Tr???ng th??i</TableCell>
                                        <TableCell align="left">????nh gi??</TableCell>
                                        <TableCell></TableCell>
                                        {/* <TableCell></TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {registerLecturers.map((lecturer) => (
                                        <Teacher key={lecturer.lecId} {...lecturer} />
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
