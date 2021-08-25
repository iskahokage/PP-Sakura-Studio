import axios from "axios";
import React, { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { useHistory } from "react-router-dom";
import { JSON_API } from "../helpers/consts";

export const serviceContext = createContext();
export const useProducts = () => {
  return useContext(serviceContext);
};

const INIT_STATE = {
  servicesData: [],
  serviceToEdit: null,
  serviceDetails: {},
  cart: [],
  paginationPages: 1,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_SERVICES_DATA":
      return {
        ...state,
        servicesData: action.payload.data,
        paginationPages: Math.ceil(action.payload.headers["x-total-count"] / 3),
      };
    case "EDIT_SERVICE":
      return {
        ...state,
        serviceToEdit: action.payload,
      };
    case "GET_SERVICE_DETAILS":
      return { ...state, serviceDetails: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

const ServiceContextProvider = ({ children }) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getServicesData = async () => {
    const search = new URLSearchParams(window.location.search);
    search.set("_limit", 3);
    history
      ? history.push(`${history.location.pathname}?${search.toString()}`)
      : console.log(null);
    let res = await axios(`${JSON_API}?_limit=3&${window.location.search}`);
    dispatch({
      type: "GET_SERVICES_DATA",
      payload: res,
    });
  };
  const getServiceDetails = async (id) => {
    const { data } = await axios(`${JSON_API}/${id}`);
    dispatch({
      type: "GET_SERVICE_DETAILS",
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
    let { data } = await axios(`${JSON_API}/${id}`);
    dispatch({
      type: "EDIT_SERVICE",
      payload: data,
    });
  };
  const saveService = async (newService) => {
    await axios.patch(`${JSON_API}/${newService.id}`, newService);
  };

  const calcSubPrice = (service) => service.count * service.item.price;

  const calcTotalPrice = (services) => {
    return services.reduce((ac, cur) => {
      return (ac += cur.subPrice);
    }, 0);
  };

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          services: [],
          totalPrice: 0,
        })
      );
      cart = {
        services: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };
  const addProductToCart = (service) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        services: [],
        totalPrice: 0,
      };
    }
    let newService = {
      item: service,
      count: 1,
      subPrice: +service.price,
    };

    console.log(newService);

    let productToFind = cart.services.filter(
      (item) => item.item.id === service.id
    );
    if (productToFind.length == 0) {
      cart.services.push(newService);
    } else {
      cart.services = cart.services.filter(
        (item) => item.item.id !== service.id
      );
    }
    cart.totalPrice = calcTotalPrice(cart.services);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };
  const changeProductCount = (count, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.services = cart.services.map((service) => {
      if (service.item.id === id) {
        service.count = count;
        service.subPrice = calcSubPrice(service);
      }
      return service;
    });
    cart.totalPrice = calcTotalPrice(cart.services);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  return (
    <serviceContext.Provider
      value={{
        history,
        servicesData: state.servicesData,
        serviceToEdit: state.serviceToEdit,
        serviceDetails: state.serviceDetails,
        paginationPages: state.paginationPages,
        cart: state.cart,
        addProductToCart,
        getServiceDetails,
        addService,
        deleteService,
        editService,
        getServicesData,
        changeProductCount,
        saveService,
        getCart,
      }}
    >
      {children}
    </serviceContext.Provider>
  );
};

export default ServiceContextProvider;
