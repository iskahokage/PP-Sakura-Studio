import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { serviceContext } from "../../contexts/ServiceContext";
import Loader from "../Loader/Loader";

const EditServicePage = () => {
  const { serviceToEdit, saveService } = useContext(serviceContext);
  const [newEditItem, setNewEditItem] = useState(serviceToEdit);
  const history = useHistory();
  useEffect(() => {
    setNewEditItem(serviceToEdit);
  }, [serviceToEdit]);

  function handleEditInput(e) {
    let newService = {
      ...newEditItem,
      [e.target.name]: e.target.value,
    };
    setNewEditItem(newService);
  }
  return (
    <div className="main">
      {newEditItem ?
            <>
                
            <div className="addService-container">
              <h1 className="addService-title">Изменение услуги</h1>
              <form className="addService-form">
                <div className="addService-inputContainer">
                  <p>Название услуги:</p>
                  <input
                  name= "brand"
                    value={newEditItem.brand}
                    onChange={handleEditInput}
                    type="text"
                  />
                </div>
                <div className="addService-inputContainer">
                  <p>Цена услуги:</p>
                  <input
                  name= "description"
                    value={newEditItem.description}
                    onChange={handleEditInput}
                    type="text"
                  />
                </div>
                <div className="addService-inputContainer">
                  <p>Описание услуги:</p>
                  <input
                  name= "price"
                    value={newEditItem.price}
                    onChange={handleEditInput}
                    type="text"
                  />
                </div>
                <div className="addService-inputContainer">
                  <p>Url для картинки:</p>
                  <input
                  name= 'image'
                    value={newEditItem.image}
                    onChange={handleEditInput}
                    type="text"
                  />
                </div>
                <button onClick={() => saveService(newEditItem)} >
                  Сохранить изменения
                </button>
              </form>
            </div>
            </>
            : <Loader/>
            }
    </div>
  );
};

export default EditServicePage;
