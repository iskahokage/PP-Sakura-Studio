import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CircularProgress } from '@material-ui/core';
import { useProducts } from '../../contexts/ServiceContext';
import Comments from '../Comments/Comments';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: '20px',
    margin: 'auto',
    maxWidth: "80%",
  },
  image: {
    // height: "50%",
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxHeight: '300px',
    height: "100%",
    maxWidth: '300px',
    width: "100%",

  },
  main_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  title:{
    fontSize: "24px",
    fontWeight: 700,
    textAlign:"center",
  },
}));



const ProductDetails = () => {
  const { id } = useParams()
  const { getServiceDetails, serviceDetails, history } = useProducts()
  const classes = useStyles();



  useEffect(() => {
    getServiceDetails(id)
  }, [id])

  useEffect(() => {
    console.log(serviceDetails)
  }, [serviceDetails])

  return (
    <>
    {serviceDetails && serviceDetails.image ?
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid className={classes.main_container} container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={serviceDetails.image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography className={classes.title} gutterBottom variant="subtitle1">
                    {serviceDetails.brand}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {serviceDetails.type}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ID: {serviceDetails.id}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">
                    {serviceDetails.description}
                  </Typography>
                  <Typography onClick={()=>history.push('/catalog')} variant="body2" style={{ cursor: 'pointer' }}>
                    Вернуться назад
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{serviceDetails.price} сом</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Comments id={serviceDetails.id}/>
      </div>
    :
    <CircularProgress />
    }
    </>
  );
};

export default ProductDetails;