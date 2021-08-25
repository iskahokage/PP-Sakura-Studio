import {
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";


const Home = () => {
  return (
    <div className="home">
        <h1 className={'homeTitle'}>Добро пожаловать в Sakura Studio</h1>
        <p className='homeDesc'><b>Sakura Studio — </b>лучший салон красоты, где все делается отдуши для души и красиво</p>
      <Paper elevation={3}  className={'homeContainer'}>
        <div className='imgContainer'>
          <img className='homeImg' src="https://i.pinimg.com/736x/58/9e/3e/589e3e08382a3d1610ccd46249daafd7.jpg" alt="" />
          <p>
            Наш маник это само творение исскуства, такой шпатлевки(лака) нет нигде, только в нашей Сакура студио.
          </p>
        </div>
      </Paper>
      <Paper elevation={3}  className={'homeContainer'}>
        <div className='imgContainer'>
          <img className='homeImg' src="https://salon-milfey.by/images/detskiy-pedikur.jpg" alt="" />
          <p>
            Наш педикюр сделает так что бы все смотрели на ваши стопы, даже если вы не хотите этого
          </p>
        </div>
      </Paper>
      <Paper elevation={3}  className={'homeContainer'}>
        <div className='imgContainer'>
          <img className='homeImg' src="http://persona.tiamatt.ru/images/mp-photo5.jpg" alt="" />
          <p>
            Приходите к нам и ваша укладка станет прочнее, чем у Черной Вдовы в разгар битвы с Таносом
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default Home;
