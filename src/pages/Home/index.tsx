import React from 'react'
import AdminBar from '@/components/AdminBar'
import { Outlet } from "react-router-dom"


function Home() {
  return (
    <div className='flex min-h-screen bg-[#F3F4F6]'>
        <div className='w-[250px] bg-[#FFFFFF]'>
            <AdminBar />
        </div>
    <div className='flex-1 p-3'><Outlet /></div>
  </div>
  )
}

export default Home