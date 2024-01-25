import React from 'react';
import './App.css';
import Dest from './components/Dest/Dest'; 
import Nav from './components/Nav/Nav';
import Pack from './components/Pack/Pack'; 
import Reg from './components/Reg/Reg.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Us from './components/Dest/US.jsx';
import Home from './components/Home/home.jsx';
import Uk from './components/Dest/Uk.jsx';
import Aus from './components/Dest/Aus.jsx';
import Par from './components/Dest/FR.jsx';
import Jap from './components/Dest/Asia.jsx';
import Mal from './components/Dest/Afr.jsx'; 
import Dash from './components/Dashboard/Dash.jsx'; 
import Paris from './components/Pack/Paris.jsx'; 
import Destres from './components/Dest/destres.jsx';
// Define your routes as an array of objects
const routes = [
  { path: '/', element: <Home /> },
  { path: '/Pack', element: <Pack /> },
  { path: '/Dest', element: <Dest /> },
  { path: '/Reg', element: <Reg /> },
  { path: '/Login', element: <Login /> },
  { path: '/US', element: <Us /> },
  { path: '/Uk', element: <Uk /> },
  { path: '/Aus', element: <Aus /> },
  { path: '/Par', element: <Par /> },
  { path: '/Jap', element: <Jap /> },
  { path: '/Mal', element: <Mal /> },
  { path: '/Paris', element: <Paris /> },
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
          </Routes>  
          
        </BrowserRouter> 
      </div>
    </>
  );
}

export default App;
