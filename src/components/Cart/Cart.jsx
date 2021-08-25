import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect } from 'react';
import { Tab, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useProducts } from '../../contexts/ServiceContext';

console.log('asd')

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCellImg: {
    width: 50,
  },
  fav:{
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 500,
  }
});

export default function Cart() {
  const classes = useStyles();
  const [count, setCount] = useState([]);
  const { cart, getCart, changeProductCount } = useProducts();

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    setCount();
  }, [cart]);

  const handleCountChange = (count, id) => {
    changeProductCount(count, id);
  };

  return (
    <TableContainer component={Paper}>
      <p className={classes.fav}>Избранное</p>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">SubPrice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.services?.length > 0 &&
            cart.services.map((service) => (
              <TableRow key={service.item.id}>
                <TableCell>
                  <img className={classes.tableCellImg} src={service.item.image} alt={service.item.title} />
                </TableCell>
                <TableCell align="right">{service.item.title}</TableCell>
                <TableCell align="right">{service.item.price}</TableCell>
                <TableCell align="right">
                  <input
                    type="number"
                    value={service.count}
                    onChange={(e) => handleCountChange(e.target.value, service.item.id)}
                  />
                </TableCell>
                <TableCell align="right">{service.subPrice}</TableCell>
              </TableRow>
            ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>
              <Typography variant="h5">Total:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h5">{cart.totalPrice}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}