import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import NavBar from './components/NavBar/NavBar';
import Deparment from './pages/Deparment';
// import Deparment1 from './pages/Deparment-1';
import SignInSide from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Profile from './pages/Profile';
import authService from './service/auth';
import Teacher from './pages/Teacher';
import Subject from './pages/Subject';
import SubjectInfo from './pages/SubjectInfo';
import LecturerInfo from './pages/LecturerInfo';
import AccountManagement from './pages/AccountManagement';
import DepartmentManagement from './pages/DepartmentManagement';
// import { response } from 'express';
// import axios from 'axios';

export let Context = React.createContext()


function App() {

  let [state, setState] = useState({
    sidebar: JSON.parse(localStorage.getItem('sidebar') || 'false'),
  })

  let [auth, setAuth] = useState(localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {
    login: false,
    user: null
  })



  async function loginHandle({ username, password }) {
    let result = await authService.login({ username, password });
    // alert(result.status);  
    // console.log(result);

    if (result.error) {
      return result;
    }

    else {

      let user = await authService.info(result.id);

      let role = await authService.role(user.roleId);


      console.log(role);


      setAuth({
        login: true,
        user: {
          id: result.id,
          name: user.fullname,
          token: result.token
        }
      })

      localStorage.setItem('auth', JSON.stringify({
        token: result.token,
        login: true,
        user: {
          id: result.id,
          name: user.fullname,
          token: result.token
        }
      }))
    }
  }

  function logoutHandle() {
    setAuth({
      login: false,
      user: null
    });
    localStorage.removeItem('auth');
    localStorage.removeItem('sidebar');

  }

  return (
    <Context.Provider value={{ state, setState, auth, loginHandle, logoutHandle }}>
      <Router>
        <Switch>
          <Route path="/login" exact component={SignInSide} />
          <Route path="/">
            <MainLayout>
              <Route path="/" exact component={Deparment} />
              <Route path='/profile' exact component={Profile} />
              <Route path='/teacher' exact component={Teacher} />
              <Route path='/subject' exact component={Subject} />
              <Route path='/subject/:id' exact component={SubjectInfo} />
              <Route path='/teacher/:id' exact component={LecturerInfo} />
              {/* ////////////////////////////////////////////////////// */}

              <Route path="/account" exact component={AccountManagement} />
              <Route path="/department" exact component={DepartmentManagement}/>
            </MainLayout>
          </Route>
        </Switch>

      </Router>
    </Context.Provider>

  );
}

export default App;
