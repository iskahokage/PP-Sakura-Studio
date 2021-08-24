import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { authContext } from "..";
import AddService from "../components/Admin/AddService";
import EditServicePage from "../components/Admin/EditServicePage";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import ServiceContextProvider from "../contexts/ServiceContext";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import { useAuthState } from "react-firebase-hooks/auth";

const Routes = () => {
  const { auth } = useContext(authContext);
  const [ user ] = useAuthState(auth);

  return user ? (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/edit" component={EditServicePage} />
      <Route exact path="/add" component={AddService} />
      <Redirect to='/home'/>
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/registration" component={RegistrationPage} />
      <Redirect to='/login'/>
    </Switch>
  );
  // return (
  //   <BrowserRouter>
  //     <ServiceContextProvider>
  //       
  //       <Switch>
  //
  //
  //       </Switch>
  //     </ServiceContextProvider>
  //   </BrowserRouter>
  // );
};

export default Routes;
