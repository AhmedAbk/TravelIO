import React from 'react';
import './App.css';
import Dest from './components/Dest/Dest'; 
import Nav from './components/Nav/Nav';
import Pack from './components/Pack/Pack'; 
import Reg from './components/Reg/Reg.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
 
import Home from './components/Home/home.jsx';
 
import Dash from './components/Dashboard/Dash.jsx';  
import Destres from './components/Dest/destres.jsx'; 
import Packres from './components/Pack/Packres.jsx';
const routes = [
  { path: '/', element: <Home /> },
  { path: '/Pack', element: <Pack /> },
  { path: '/Dest', element: <Dest /> },
  { path: '/Reg', element: <Reg /> },
  { path: '/Login', element: <Login /> }, 
  { path: '/Dashboard', element: <Dash /> },
];

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Nav />  
          <Routes>  
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            
            ))}
            <Route path='/Dest/:id' element={<Destres/>}/>
            <Route path='/Pack/:id' element={<Packres/>}/>
          </Routes>  
          
        </BrowserRouter> 
      </div>
    </>
  );
}

export default App;
