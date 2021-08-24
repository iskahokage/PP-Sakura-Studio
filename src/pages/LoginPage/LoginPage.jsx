import { Button, TextField } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { authContext } from "../..";
import firebase from "firebase";

const LoginPage = () => {
  const { auth } = useContext(authContext);

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    console.log(user);
  };
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const clearError = () => {
    setEmailError("");
    setPasswordError("");
  };
  const clearInput = () => {
    setEmail("");
    setPassword("");
  };
  const handleLogin = async () => {
    clearError();
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError("Такого e-mail не существует");
          break;
        case "auth/wrong-password":
          setPasswordError("Вы ввели не правильный пароль!");
          break;
      }
    });
  };
  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };
  const handleReset = () => {
    if (email != "") {
      firebase.auth().sendPasswordResetEmail(email);
      alert(`Письмо с восстановлением отправлено на почту ${email}`)
    }
  };
  useEffect(() => {
    authListener();
  }, []);
  return (
    <div className="loginPage">
      <p className="loginPage-welcomeTitle">Добро пожаловать в Sakura Studio</p>
      <div className="loginPage-container">
        <p className="loginPage-title">Авторизация</p>
        <div className="inputContainer">
          <form action="" autocomplete="off" className="inputForm">
            <TextField
              name="email"
              id="email"
              label="Введите email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <p>{emailError}</p>
            <TextField
              name="password"
              id="password"
              variant="outlined"
              label="Введите пароль"
              type="password"
              requaired
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>
              {passwordError}
              {passwordError ? (
                <NavLink to="#" onClick={handleReset}>
                  <p>Забыл пароль?</p>
                </NavLink>
              ) : (
                ""
              )}
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

          <Button onClick={loginWithGoogle} color="primary" variant="contained">
            Войти с помощью Google
            <FcGoogle />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
