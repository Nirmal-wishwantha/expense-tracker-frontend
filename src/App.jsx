import { Route, Router, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Register from './pages/register/Register'

import { Toast } from './common/funtion/index';


import Home from './pages/home/Home';
import { useEffect, useState } from 'react';


function App() {

  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('expensive-token')) {
      setLogin(true)
    }

  }, [])

  return (

    <div>
      <Toast />
      {
        login ? <Main /> :

          <Routes>
            <Route path='*' element={<Navigate to={'/user/login'} />}></Route>
            <Route path='/user/login' element={<Login />} />
            <Route path='/user/register' element={<Register />} />

          </Routes>

      }

    </div>
  )
}

export default App



function Main() {

  return (

    <div>
      <Home />
    </div>
  )
}