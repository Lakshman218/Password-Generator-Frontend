import React, { useEffect } from 'react'
import { useState } from 'react'
import './index.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {

    const selectUser = (state) => state.auth.user
    const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
