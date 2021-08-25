import { IconButton, Paper } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import { authContext } from "../..";
import { serviceContext } from "../../contexts/ServiceContext";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { makeStyles } from '@material-ui/core/styles';
import { ChatBubble } from "@material-ui/icons";

const ProductCard = () => {
    const { servicesData, getServicesData, deleteService, editService,cart, addProductToCart } =
        useContext(serviceContext);
    const { auth } = useContext(authContext);
    const [user] = useAuthState(auth);
    useEffect(() => {
        getServicesData();
    }, [])
    
    const checkItemInCart = (id) => {
        if(cart.services){
            const foundItem = cart.services.find((service) => service.item.id === id);
            return foundItem ? 'secondary' : 'default';
        }
      };


    function handleClick(id) {
        deleteService(id);
    }
    return (
        <>
            {servicesData.map(item => (
            <Paper elevation={3} className='serviceList-card'>
              <div>
                  <img className='serviceList-img' src={item.image} alt="" />   
              </div>
              <div>
                    <p className='serviceList-serviceTitle'>
                      <b><h5>{item.category} {item.brand}:</h5> {item.model}</b>
                    </p>
                    <p className='serviceList-serviceDescription'>{item.description}</p>
                    <p className='serviceList-servicePrice '>
                      Цена: <b>{item.price}</b> Сом 
                    </p>                
              </div>
              <div>
                <IconButton
                    color={
                        checkItemInCart(item.id)
                    }
                    onClick={() => addProductToCart(item)}
            aria-label="add to favorites"

                >
                    <BookmarkIcon/>
                </IconButton>
                <NavLink to={`/details/${item.id}`}>
                    <IconButton>
                        <ChatBubble/>
                    </IconButton>
                </NavLink>
              </div>
              {user.email == 'admin@admin.com' ?
                  (
                      <div className="serviceList-buttonContainer">
                          <button className='button delete' onClick={() => handleClick(item.id)}>Delete</button>
                          <NavLink to="/edit">
                              <button className='button edit' onClick={() => editService(item.id)}>Edit</button>
                          </NavLink>
                      </div>
              
                  ) : ('')}
            </Paper>
            
          ))}
        </>
    );
};

export default ProductCard;