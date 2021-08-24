import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import { authContext } from "../..";
import { serviceContext } from "../../contexts/ServiceContext";
import AddService from "../Admin/AddService";
import ProductCard from "./ProductCard";

const Home = () => {
  const { services, getServicesData, deleteService, editService } =
    useContext(serviceContext);
    const { auth } = useContext(authContext);
    const [user] = useAuthState(auth);
  useEffect(() => {
    getServicesData();
  }, []);
  //
  function handleClick(id) {
    deleteService(id);
  }
  return (
    <div className="main">
      <AddService />
      <h1 className="serviceList-title">Перечень услуг</h1>
      <div className="serviceList">
        <ProductCard/>
      </div>
    </div>
  );
};

export default Home;
