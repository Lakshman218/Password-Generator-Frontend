import React from 'react'

function PasswordStrength({ password = '' }) {

  const getPasswordStrength = () =>{
    const passwordLength = password.length

    if(passwordLength<1){
        return ""
    }else if(passwordLength<4){
        return "Very weak"
    }else if(passwordLength<8){
        return "Poor"
    }else if(passwordLength<12){
        return "Medium"
    }else if(passwordLength<16){
        return "Strong"
    }else{
        return "Very strong"
    }
  }

  const passwordStren = getPasswordStrength()
  if(!passwordStren) return <React.Fragment/> 

  return (
    <div>
      <span>{passwordStren}</span>
    </div>
  )
}

export default PasswordStrength