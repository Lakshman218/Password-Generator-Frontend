import React, { useState } from 'react'
import UseGeneratePassword from '../../Hooks/UseGeneratePassword'
import { toast } from 'sonner'
import PasswordStrength from './PasswordStrength'
import AddTitle from './AddTitle'

function PasswordGenerator() {

  const [length, setLength] = useState(4)

  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: true },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ])

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData]
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state
    setCheckboxData(updatedCheckboxData)  
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    toast.success("Text Copied")
  }

  const [modal, showModal] = useState(false)
  const handleShowModal = () => showModal(true)
  const handleCloseModal = () => showModal(false)

  const { password, errorMessage, generatePassword} = UseGeneratePassword()

  return (
    <>
    
      <div className='w-full'>
        <div className='p-0 flex flex-col items-center gap-8'>
          
          {password ? (
            <div className='w-6/12 bg-black justify-between flex py-4 px-4 mt-2 rounded-md'>
              <div className='w-11/12 flex'>
                <p className='text-white flex items-center text-lg'>{password}</p>
              </div>
              <button
                onClick={() => handleCopy()} 
                className='px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-white font-bold'>
                copy
              </button>
            </div>
          ) : 
          <div className='w-6/12 bg-gray-300 justify-center flex py-4 px-4 mt-2 rounded-md'>
            <div className='flex px-4 py-2'>
              <p className='text-gray-800 flex items-center text-lg'>Create and manage all your passwords securely.</p>
            </div>
          </div> }

          <div className='flex flex-col w-6/12'>
            <span className='flex justify-between mb-2'>
              <label>Character length</label>
              <label>{length}</label>
            </span>
            <input 
              type="range" min="4" max="20"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className='w-6/12 grid grid-cols-2 gap-4'>
            {checkboxData.map((checkbox, index) => (
              <div key={index}
                onChange={() => handleCheckboxChange(index)}  
                className='flex items-center'>
                <input type="checkbox" checked={checkbox.state} className='mr-2'/>
                <label>{checkbox.title}</label>
              </div>
            ))}
          </div>

          <div className='flex justify-between w-6/12'>
            <span>Strenght : </span>
            <span className='font-semibold'><PasswordStrength password={password} /></span>
          </div>

          <div className='w-6/12'>
            <button
              onClick={() => generatePassword(checkboxData, length)} 
              className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full'>
              Generate Password
            </button>
          </div>

          {password && (
            <div className='w-6/12 flex justify-center'>
              <button
                // onClick={() => {handleSave()}} 
                onClick={handleShowModal}
                className='px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 font-semibold'>Save Password</button>
            </div>
          )}

        </div>
      </div>

      {modal && (
        <AddTitle
          onClose={handleCloseModal}
          password={password}
        />
      )}
    </>
  )
}

export default PasswordGenerator
