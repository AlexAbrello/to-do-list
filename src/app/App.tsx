import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import {useAppDispatch, useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {initializeAppTC, logoutTC} from "../features/Login/login-reducer";
import {CircularProgress} from "@mui/material";


function App() {

  const loading = useAppSelector<RequestStatusType>(state => state.app.status)
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    debugger
    dispatch(initializeAppTC())
  }, [])

  const logout = () => {
    dispatch(logoutTC())
  }

  if (!isInitialized) {
    return <div
        style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return (
      <div className="App">
        <ErrorSnackbar/>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <Typography variant="h6">
              News
            </Typography>
            {isLoggedIn && <Button color="inherit" onClick={logout}>Logout</Button>}
          </Toolbar>
          <div className='linearProgress'>
            {loading === 'loading' && <LinearProgress color='error'/>}
          </div>
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path='/' element={<TodolistsList/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
            <Route path='*' element={<Navigate to='/404'/>}/>
          </Routes>
        </Container>
      </div>
  )
}

export default App
