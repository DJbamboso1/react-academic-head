import {React, useState, useEffect} from 'react'
import CardComponent from './Card'
import { Grid, Container, } from '@material-ui/core'
import teacherService from '../../../service/teacher'

export default function CardContainer() {
  let [countLec, setCountLec] = useState([])

    useEffect(async () => {
        setCountLec(await teacherService.get())
    }, [])

  return (
    <div>
      <Container maxWidth={false} >
        <Grid
          container
          spacing={3}
          style={{display: 'flex'}}
        >
          <Grid
            item
            lg={5}
            sm={6}
            xl={3}
            xs={12}
            
          >
            <CardComponent title="Số giảng viên" total={countLec.length} index={1} />
          </Grid>
          <Grid
            item
            lg={5}
            sm={6}
            xl={3}
            xs={12}
          >
            <CardComponent title="Số môn" total={10} index={2} />
          </Grid>

        </Grid>
      </Container>
    </div>
  )
}
