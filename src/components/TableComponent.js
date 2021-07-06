import React, { useEffect, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import SearchBar from 'material-ui-search-bar'
import { Button, Modal, Select } from '@material-ui/core'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}



function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, header, selectAllHandle } = props
    let [checked, setChecked] = useState(false)

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }



    function _checked(e) {
        setChecked(e.target.checked)
        selectAllHandle(e.target.checked)

    }
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all' }}
                        onChange={_checked}
                    />
                </TableCell>
                {header.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
        // background: 'rgb(63, 81, 181)',
    },
    head: {
        backgroundColor: 'rgb(63, 81, 181)',
    }
}))

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles()
    const { numSelected, title, deleteHandle } = props

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div" >
                    {title}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={deleteHandle}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    )
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
}

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '90%',
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        width: '100%',

    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    paperModal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))



function TableComponent({ header, data, title, filter = true, deleteHandle, rowClickHandle }, ref) {

    const classes = useStyles()
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('calories')
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [selectAll, setSelectAll] = useState(false)
    const [open, setOpen] = React.useState(false)
    //search
    const [searched, setSearched] = useState("")
    const [filterData, setFilterData] = useState(data)

    useEffect(() => {
        setFilterData(data)
    }, [data])

    useImperativeHandle(ref, () => {
        return {
            selected
        }
    }, [selected])

    //////////////////////////////////////////

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = filterData.map((n) => n.name)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    //search
    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            if (title === 'Môn học') {
                selectAllHandle(null)
                return row.subjectName.toLowerCase().includes(searchedVal.toLowerCase())
            } else if (title === 'Giảng viên') {
                selectAllHandle(null)
                return row.name.toLowerCase().includes(searchedVal.toLowerCase())
            }
            return null
        })
        console.log("filteredRow: " + filteredRows)
        setFilterData(filteredRows)
    }

    const cancelSearch = () => {
        setSearched("")
        requestSearch(searched)
    }

    function selectAllHandle(flag) {
        setSelectAll(flag)

        if (flag) {
            setSelected(filterData)
        } else {
            setSelected([])
        }
    }
    //////////////////////////////////////////////////////

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    function selectChange(e, row, name) {
        let v = parseInt(e.currentTarget.dataset.value || 0)

        row[name] = v;
        setFilterData([...filterData])


    }



    const isSelected = (name) => selected.indexOf(name) !== -1

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filterData.length - page * rowsPerPage)


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar deleteHandle={deleteHandle} title={title} numSelected={selected.length} />
                <TableContainer>
                    {
                        filter && <>
                            <SearchBar
                                value={searched}
                                onChange={(searchVal) => requestSearch(searchVal)}
                                onCancelSearch={() => cancelSearch()}
                            />
                            <Button variant="contained" color="primary" type="button" onClick={handleOpen}>
                                {'Thêm ' + title.toLowerCase()}
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                <div className={classes.paperModal} style={{ top: '40%', left: '40%', transform: `translate(-50%, - 50%` }}>

                                </div>
                            </Modal>
                        </>
                    }

                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >

                        <EnhancedTableHead
                            selectAllHandle={selectAllHandle}
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={filterData.length}
                            // rowCount={data.length}
                            header={header}
                        />
                        <TableBody>
                            {stableSort(filterData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {

                                    const isItemSelected = isSelected(row.id)
                                    console.log('row.name: ' + row.id)
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected || selectAll}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onClick={(event) => handleClick(event, row.id)}
                                                />
                                            </TableCell>
                                            {
                                                header.map(e => {

                                                    let data = row[e.id]
                                                    if (e?.type === 'select') {
                                                        data = <Select onClick={e => e.stopPropagation()} value={row[e.id]} onChange={a => selectChange(a, row, e.id)}>
                                                            <option value="">Chọn giảng viên</option>
                                                            {
                                                                e.data.map(a => <option value={a.value}>{a.label}</option>)
                                                            }
                                                        </Select>
                                                    }

                                                    return <TableCell key={row.id} align={e.numeric ? 'right' : 'left'} onClick={(event) => rowClickHandle?.(row)}>{data}</TableCell>
                                                })
                                            }
                                        </TableRow>
                                    )
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    // count={data.length}
                    count={filterData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

        </div>
    )
}


export default React.forwardRef(TableComponent)