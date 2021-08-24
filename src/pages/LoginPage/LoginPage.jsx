import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { authContext } from "../..";
import firebase from "firebase";

const LoginPage = () => {
  const { auth } = useContext(authContext);

  const loginWithGoogle = async() => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const {user} = await auth.signInWithPopup(provider)
    console.log(user);
  };
  const [user, setUser] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const clearError = () =>{
    setEmailError('');
    setPasswordError('');
  }
  const clearInput =()=>{
    setEmail('');
    setPassword('');
  
  }
  const handleLogin = async()=>{
    clearError()
    auth
    .signInWithEmailAndPassword(email, password,)
    .catch(err => {
      switch(err.code){
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          setEmailError(err.message);
          break;
        case 'auth/wrong-password':
          setPasswordError(err.message);
          break;
      }
    });
  };
  const authListener = () =>{
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        clearInput()
        setUser(user);
      }
      else{
        setUser('');
      }
    })
  };
  useEffect(()=>{
    authListener()
  }, [])
  return (
    <div className="loginPage">
      <div className="loginPage-container">
        <p className="loginPage-title">Авторизация</p>
        <div className="inputContainer">
          <form action="" autocomplete="off" className="inputForm">
            <TextField
              name="email"
              id="email"
              label="Введите email"
              variant="outlined"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
            <p>{emailError}</p>
            <TextField
              name="password"
              id="password"
              variant='outlined'
              label="Введите пароль"
              type='password'
              requaired value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <p>{passwordError}
            {
              passwordError? (<NavLink to='#'><p>
                Забыл пароль?
              </p></NavLink>): ("")
            }
            </p>
            <Button
              onClick={handleLogin}
              variant="contained"
              color="primary"
              className="registrationButton"
            >
              Войти
            </Button>
          </form>
        </div>
        <div className="loginPage-buttonContainer">
          <NavLink to="/registration">
            <p className="loginPage-registerLink">Еще нет аккаунта?</p>
          </NavLink>

          <Button
            onClick={loginWithGoogle}
            color="primary"
            variant="contained"
            className="loginPage-registerLink"
          >
            Войти с помощью Google
            <FcGoogle />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
