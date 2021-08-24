import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { serviceContext } from '../../contexts/ServiceContext';

const EditServicePage = () => {
    
    const {serviceToEdit, saveService} = useContext(serviceContext);
    const [newEditItem, setNewEditItem] = useState(serviceToEdit)
        useEffect(()=>{
            setNewEditItem(serviceToEdit)
        }, [serviceToEdit])

    function handleEditInput(e){
        let newService ={
            ...newEditItem,
        [e.target.name]:e.target.value,
        }
        setNewEditItem(newService)
    }
    return (
        <div>
            {newEditItem ?
            <>
                <form>
                    <input name= "brand" onChange={handleEditInput} value={newEditItem.brand} type="text" />
                    <input name= "description" onChange={handleEditInput} value={newEditItem.description} type="text" />
                    <input name= "price" onChange={handleEditInput} value={newEditItem.price} type="text" />
                    <input type="text" />
                    <Link to="/">
                     <button onClick={()=>saveService(newEditItem)}>Edit Product</button>
                    </Link>
                </form>
            </>
            : <h1>LOADING...</h1>
            }
        </div>
    );
};

export default EditServicePage;