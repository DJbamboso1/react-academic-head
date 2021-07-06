// import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from './components/AccountProfile';

import AccountProfileTab from './components/AccountProfileTab';
import { Context } from '../../App';
import { Redirect } from 'react-router';
import { useContext } from 'react';


import React from 'react'

export default function Account() {

  let { auth } = useContext(Context);
  if (!auth.login) return <Redirect to="/login" />

  return (
    <div>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileTab />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}
