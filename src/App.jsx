import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Register from './pages/register/Register'

import { Toast } from './common/funtion/index';
import Home from './pages/home/Home';
import { useState } from 'react';


function App() {

  const [login, setLogin] = useState(false);

  return (

    <div>

      {/* {
        <Login /> ? <Main /> :

          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Toast />
          </Routes>

      } */}


      <Login/>

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