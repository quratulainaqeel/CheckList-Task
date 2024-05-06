import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Protected from './Protected';
import Home from './Pages/Home';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Protected Component={Login} />} />
        <Route path='/signup' element={<Protected Component={Signup}/>} />
        <Route path='/home' element={<Protected Component={Home} />} />
      </Routes>
    </div>
  )
}

export default App
