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
    { id: 'id', numeric: true, disablePadding: true, label: 'Code' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Họ và tên' },
    { id: 'departmentId', numeric: true, disablePadding: false, label: 'Mã phòng ban' },
    { id: 'lectureType', numeric: true, disablePadding: false, label: 'Loại giảng viên' },
    { id: 'minCourse', numeric: true, disablePadding: false, label: 'Min' },
    { id: 'maxCourse', numeric: true, disablePadding: false, label: 'Max' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Trạng thái' },
];

export default function LecturerInfo() {

    // let teacherRef = useRef()


    
    let [teacher, setTeacher] = useState([])
    let { params: { id } } = useRouteMatch()

    useEffect(async () => {
        setTeacher(await teacherService.getOne(id))
    }, [id])

    console.log("id: " + id);

    console.log("setTeacher: " + teacher.name);

    console.log("teacherServices: " + teacherService.getOne(1))

    const handleChange = (event) => {
        setTeacher({
            ...teacher,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        alert(teacher.name);
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
                        title="Quản lý giảng viên"
                    />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <Typography variant="h6">
                                    Tên giảng viên
                                </Typography>
                                <TextField
                                    fullWidth
                                    // helperText="Please specify the first name"
                                    // label="Tên môn"
                                    name="name"
                                    onChange={handleChange}
                                    required
                                    value={teacher.name}
                                    
                                    // {subject.subjectName}
                                    variant="outlined"
                                />
                            </Grid>
                            {/* <Grid item md={6} xs={12}>
                            <Typography variant="h6">
                                    Mã môn
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="Mã môn"
                                    name="code"
                                    onChange={handleChange}
                                    required
                                    value={teacher.code}
                                    // {subject.subjectCode}
                                    variant="outlined"
                                />
                            </Grid> */}
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
            </form>
        </Container>
    )
}
