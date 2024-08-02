import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../utils/context/authSlice';
import { useNavigate } from 'react-router-dom';
import PasswordGenerator from './PasswordGenerator';
import Navbar from './Navbar';
import SavedPasswords from './SavedPasswords';

function Home() {

  const selectUser = (state) => state.auth.user
  const user = useSelector(selectUser)
  console.log("userdata", user);
  
  const [showPassword, setShowPassword] = useState(false)
  const handlePassword = () => setShowPassword(!showPassword)

  return (
    <>
      <div className='flex flex-col'>
        <div>
          <Navbar handlePassword={handlePassword} showPassword={showPassword}/>
        </div>
        <p className='text-xl font-bold text-center p-4'>Password Generator</p> 
        {!showPassword ? (
          <div>
            <PasswordGenerator />
          </div>
        ) : (
          <div>
            <SavedPasswords />
          </div>
        )}
        
      </div>
    </>
  )
}

export default Home