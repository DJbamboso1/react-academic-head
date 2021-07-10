import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import subjectService from '../../service/subject'

import { Container, Typography } from '@material-ui/core';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@material-ui/core';
import Select from 'react-select';
import TableComponent from '../../components/TableComponent';
import departmentService from '../../service/department';
import teacherService from '../../service/teacher';



const headCells = [
    // { id: 'id', numeric: true, disablePadding: true, label: 'Code' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Họ và tên' },
    { id: 'departmentId', numeric: true, disablePadding: false, label: 'Mã phòng ban' },
    { id: 'lectureType', numeric: true, disablePadding: false, label: 'Loại giảng viên' },
    { id: 'minCourse', numeric: true, disablePadding: false, label: 'Min' },
    { id: 'maxCourse', numeric: true, disablePadding: false, label: 'Max' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Trạng thái' },
];

export default function SubjectInfo() {

    let teacherRef = useRef()


    const [subject, setSubject] = useState({
        teacher: []
    })
    let [teacher, setTeacher] = useState([])
    let { params: { id } } = useRouteMatch()
    useEffect(async () => {
        setSubject(await subjectService.getOne(id))

        setTeacher(await teacherService.get())
    }, [id])

    const handleChange = (event) => {
        setSubject({
            ...subject,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        alert(subject.subjectName);
    }

    function _addTeacher(e) {
        let { value } = e

        let f = teacher.find(e1 => e1.id === value)
        if (f) {
 
            let { teacher } = subject
            teacher.push(f)
            setSubject({
                ...subject,
                teacher
            })

            // setSubject({
            //     ...subject,
            //     teacher: [
            //         ...subject.teacher,
            //         f
            //     ]
            // })
        }
    }

    function _deleteTeacher(e) {
        let { selected } = teacherRef.current
        let { teacher } = subject
        selected.forEach(e1 => {
            let f = teacher.findIndex(e => e1 === e.id)
            if (f !== -1) {
                teacher.splice(f, 1)
            }

        })
        selected.splice(0,selected.length)
        setSubject({
            ...subject,
            teacher
        })
    }

    return (
        <Container>
            <form
                autoComplete="off"
                noValidate
                
            >
                <CardHeader/>
                <Card style={{ overflow: 'inherit' }}>
                    <CardHeader
                        title="Quản lý môn học"
                    />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <Typography variant="h6">
                                    Tên môn
                                </Typography>
                                <TextField
                                    fullWidth
                                    // helperText="Please specify the first name"
                                    // label="Tên môn"
                                    name="subjectName"
                                    onChange={handleChange}
                                    required
                                    value={subject.subjectName}
                                    // {subject.subjectName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                            <Typography variant="h6">
                                    Mã môn
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="Mã môn"
                                    name="subjectCode"
                                    onChange={handleChange}
                                    required
                                    value={subject.subjectCode}
                                    // {subject.subjectCode}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            style={{ margin: 10 }}
                            onClick={handleSubmit}
                        >
                            Cập nhật
                        </Button>
                    </Box>
                    <Divider />


                </Card>
                <Grid item md={12} xs={12} style={{ margin: 10 }}>
                    <Typography variant='h5' style={{marginTop: 30, marginBottom: 10}}>
                        Chọn giảng viên để thêm:
                    </Typography>
                    <Select
                        // defaultValue={[colourOptions[2], colourOptions[3]]}
                        name="colors"
                        options={
                            teacher.filter(e => !subject.teacher.find(e1 => e1.id === e.id)).map(e => ({
                                label: e.name,
                                value: e.id
                            }))
                        }
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={_addTeacher}
                    />

                    <Card style={{marginTop: 10}}>
                        {/* <CardHeader title='Lecturer' /> */}
                        <CardContent>
                            <TableComponent ref={teacherRef} deleteHandle={_deleteTeacher} filter={false} title="Giảng viên" header={headCells} data={subject.teacher} />
                        </CardContent>
                    </Card>
                </Grid>
            </form>
        </Container>
    )
}
