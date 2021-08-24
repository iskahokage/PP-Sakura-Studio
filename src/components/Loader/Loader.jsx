import { Container, Grid } from '@material-ui/core';
import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div className='loaderContainer'>
            
            <div className="lds-dual-ring">
            </div>
        </div>
    );
};

export default Loader;