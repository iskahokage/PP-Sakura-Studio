import { Button, IconButton, InputAdornment, OutlinedInput, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../..";
import firebase from "firebase";




const RegistrationPage = () => {
    const { auth  } = useContext(authContext);
    const [user, setUser] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const clearError = () =>{
        setEmailError('');
        setPasswordError('');
      }
    const handleRegister = async()=>{
        clearError()
        auth
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
          switch(err.code){
            case 'auth/email-alredy-in-use':
            case 'auth/invalid-email':
              setEmailError(err.message);
              break;
            case 'auth/weak-password':
              setPasswordError(err.message);
              break;
          }
        })
    }
    
  return (
    <div className="registrationPage">
      <div className="registrationPage-container">
        <p className="registrationPage-title">Регистрация</p>
        <div className="inputContainer">
          <form action="" autocomplete="off" className='inputForm'> 
            <TextField
              name='email'
              id="email"
              label="Введите почту"
              variant="outlined"
              onChange={(e) =>setEmail(e.target.value)}
              value={email}
            />
            <TextField
              name='password'
              id="password"
              type="password"
              variant='outlined'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <NavLink to='/login' className='registrationButton'>    
                <Button onClick={handleRegister} variant='contained' color='primary' >
                    Зарегистрироваться
                </Button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
