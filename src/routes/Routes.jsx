import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { authContext } from "..";
import AddService from "../components/Admin/AddService";
import EditServicePage from "../components/Admin/EditServicePage";
import Home from "../components/Home/Home";
import ServiceContextProvider from "../contexts/ServiceContext";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "../components/Chat/Chat";
import Catalog from "../components/Catalog/Catalog";
import Cart from "../components/Cart/Cart";
import ProductDetails from "../components/Home/ProductDetails";

const Routes = () => {
  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);

  return user ? (
    <ServiceContextProvider>
      <Switch>
        <Route exact path="/home" component={Home}/>
        <Route exact path = '/catalog' component={Catalog}/>
        <Route exact path="/edit/" component={EditServicePage} />
        <Route exact path="/add" component={AddService} />
        <Route exact path ='/details/:id' component={ProductDetails}/>
        <Route exact path='/chat' component={Chat}/>
        <Route exact path = '/cart'component={Cart}/>
        <Redirect to="/home" />
      </Switch>
    </ServiceContextProvider>
  ) : (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/registration" component={RegistrationPage} />
      <Redirect to="/login" />
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
