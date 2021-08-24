
import Button from '@material-ui/core/Button';
import React from "react";
import { NavLink } from "react-router-dom";

const WelcomePage = () => {
  return (
    <>
      <div className="welcomePage">
        <div className="welcomePage-container">
          <h1 className="welcomePage-title">
            Добро пожаловать в Sakura Studio
          </h1>
          <div className="selectBlock">
            <NavLink to="/home" className="block">
              <Button variant="contained" color="primary" className='block'>
                <p>Я Клиент</p>
              </Button>
            </NavLink>
            <NavLink to="/login" className="block">
              <Button variant="contained" color="primary" className='block'>
                <p>Я мастер</p>
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
