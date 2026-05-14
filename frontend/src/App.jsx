import React ,{ useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MainLayouts from './Layouts/MainLayouts'
import NotFound from './pages/NotFound'
import AOS from "aos";
import "aos/dist/aos.css";
import Dashboard from './pages/Dashboard'
import Departments from './pages/Departments'

function App() {

 useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,     // animate only once
      offset: 100,    // trigger offset
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<MainLayouts/>}>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/departments' element={<Departments/>} />
        </Route>
        <Route path='/home' element={<Home/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App