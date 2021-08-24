import axios from "axios";
import React from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { JSON_API } from "../helpers/consts";

export const serviceContext = createContext();

const INIT_STATE = {
  services: [],
  serviceToEdit: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_SERVICES_DATA":
      return {
        ...state,
        services: action.payload,
      };
    case "EDIT_SERVICE":
      return {
        ...state,
        serviceToEdit: action.payload,
      };
    default:
      return state;
  }
};

const ServiceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getServicesData = async () => {
    let { data } = await axios(JSON_API);
    dispatch({
      type: "GET_SERVICES_DATA",
      payload: data,
    });
  };

  const addService = (newService) => {
    axios.post(JSON_API, newService);
    getServicesData();
  };
  const deleteService = async (id) => {
    await axios.delete(`${JSON_API}/${id}`);
    getServicesData();
  };
  const editService = async (id) => {
    let {data} = await axios(`${JSON_API}/${id}`)
    dispatch({
      type: "EDIT_SERVICE",
      payload: data,
    });
  };
  const saveService = async(newService)=>{
      await axios.patch(`${JSON_API}/${newService.id}`, newService)
  }
  return(
  <serviceContext.Provider value={{
      services: state.services,
      serviceToEdit: state.serviceToEdit,
      addService,
      deleteService,
      editService,
      getServicesData,
      saveService,
  }}>
      {children}
  </serviceContext.Provider>
  );
};

export default ServiceContextProvider;
