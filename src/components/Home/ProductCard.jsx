import { Paper } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import { authContext } from "../..";
import { serviceContext } from "../../contexts/ServiceContext";

const ProductCard = () => {
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
        <>
            {services.map((item) => (
                <Paper className="serviceList-card" elevation={12}>
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