import { Route, Router, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
<<<<<<< HEAD

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
=======

function App() {
>>>>>>> dd9c2f9d18b6be36bb76cdb5f3f3ccafa0536fb2

  return (

    <div>
<<<<<<< HEAD
      <Toast />
      {
        login ? <Main /> :

          <Routes>
            <Route path='*' element={<Navigate to={'/user/login'} />}></Route>
            <Route path='/user/login' element={<Login />} />
            <Route path='/user/register' element={<Register />} />

          </Routes>

      }
=======
      <Login />
      {/* <Register/> */}
>>>>>>> dd9c2f9d18b6be36bb76cdb5f3f3ccafa0536fb2

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