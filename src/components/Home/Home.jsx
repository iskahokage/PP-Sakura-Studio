import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { serviceContext } from "../../contexts/ServiceContext";
import AddService from "../Admin/AddService";

const Home = () => {
  const { services, getServicesData, deleteService, editService } =
    useContext(serviceContext);
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
        {services.map((item) => (
          <div className="serviceList-card">
            <p className="serviceList-serviceTitle" key={item.id}>
              {item.brand}
            </p>
            <p className="serviceList-serviceDescription" key={item.id}>
              {item.description}
            </p>
            <p className="serviceList-servicePrice" key={item.id}>
              {item.price} Сом
            </p>
            <img className="serviceList-img" src={item.image} alt="" />
            <br />
            <div className="serviceList-buttonContainer">
                <button className='button delete' onClick={() => handleClick(item.id)}>Delete Item</button>
                <NavLink to="/edit">
                <button className='button edit' onClick={() => editService(item.id)}>Edit Product</button>
                </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
