import { CircleUserRound, LogOut } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/context/authSlice';

function Navbar({showPassword, handlePassword}) {

  const selectUser = (state) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  };

  return (
    <div className='w-full py-3 px-6 bg-gray-100 shadow-md'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2 cursor-pointer' onClick={toggleDropdown}>
          <span><CircleUserRound className='text-gray-800' /></span>
          <p className='text-gray-800 font-semibold text-lg'>Profile</p>
        </div>
        <button
          onClick={handlePassword} 
          className='w-44 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 font-semibold'>
          {showPassword ? "Generate Password" : "Saved Passwords"}
        </button>
      </div>

      {isDropdownOpen && (
        <div ref={dropdownRef} className='absolute top-14 left-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4'>
          <p className='font-semibold'>{user.name}</p>
          <p className='text-gray-600'>{user.email}</p>
          <button
            onClick={handleLogout}
            className='mt-0 py-2 text-red-600 rounded-lg flex justify-center items-center gap-2 text-lg'
          >
            Logout <span> <LogOut size={16} /> </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
