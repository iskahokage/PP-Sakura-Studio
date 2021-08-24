import { makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { serviceContext } from "../../contexts/ServiceContext";

const AddService = () => {
  const [inpTitle, setInpTitle] = useState("");
  const [inpDescription, setInpDescription] = useState("");
  const [inpPrice, setInpPrice] = useState("");
  const [inpImage, setInpImage] = useState("");
  const { addService } = useContext(serviceContext);
  function handleClick() {
    let newObj = {
      brand: inpTitle,
      description: inpDescription,
      price: inpPrice,
      image: inpImage,
    };
    addService(newObj);
    setInpTitle("");
    setInpDescription("");
    setInpPrice("");
  }
  return (
    <div className="addService-container">
      <h1 className="addService-title">Добавление услуги</h1>
      <form className="addService-form">
        <div className="addService-inputContainer">
          <p>Название услуги:</p>
          <input
            value={inpTitle}
            onChange={(e) => setInpTitle(e.target.value)}
            type="text"
          />
        </div>
        <div className="addService-inputContainer">
          <p>Цена услуги:</p>
          <input
            value={inpPrice}
            onChange={(e) => setInpPrice(e.target.value)}
            type="text"
          />
        </div>
        <div className="addService-inputContainer">
        <p>Описание услуги:</p>
        <input
          value={inpDescription}
          onChange={(e) => setInpDescription(e.target.value)}
          type="text"
        />
        </div>
        <div className="addService-inputContainer">
        <p>Url для картинки услуги:</p>
        <input onChange={(e) => setInpImage(e.target.value)} type="text" />
        </div>
        <button onClick={handleClick}>Добавить услугу</button>
      </form>
    </div>
  );
};

export default AddService;
