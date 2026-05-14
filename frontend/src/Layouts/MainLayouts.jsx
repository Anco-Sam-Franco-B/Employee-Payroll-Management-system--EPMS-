import React from 'react'
import { Outlet } from "react-router-dom"
import LeftNavBar from '../components/LeftNavBar'
import TopNavBar from '../components/TopNavBar'
function MainLayouts() {
  return (
    <div className='w-full h-screen  flex bg-blue-50'>
        <LeftNavBar/>
        <main className='w-[82%] h-full overflow-hidden'>
            <TopNavBar/>
            <main className='w-full h-[92%] overflow-y-auto '>
                <Outlet />
            </main>
        </main>
    </div>
  )
}

export default MainLayouts