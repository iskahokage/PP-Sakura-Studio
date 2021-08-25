import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TablePagination,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useHistory } from "react-router-dom";
import { authContext } from "../..";
import { serviceContext } from "../../contexts/ServiceContext";
import AddService from "../Admin/AddService";
import ProductCard from "../Home/ProductCard";
import { Button } from "@material-ui/core";

const Catalog = () => {
  const {
    services,
    getServicesData,
    deleteService,
    editService,
    paginationPages,
  } = useContext(serviceContext);

  const history = useHistory();
  const [page, setPage] = useState(1);

  function getPage() {
    const search = new URLSearchParams(history.location.search);
    return search.get("_page");
  }
  const handleValue = (e) => {
    const search = new URLSearchParams(history.location.search);
    search.set("q", e.target.value);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getServicesData();
  };
  const handlePage = (e, page) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_page", page);
    history.push(`${history.location.pathname}?_limit=3${search.toString()}`);
    setPage(page);
    getServicesData(history);
  };
  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);
  useEffect(() => {
    getServicesData();
  }, []);

  function fetchProducts(params, value) {
    let search = new URLSearchParams(history.location.search);
    search.set(params, value);
    let url = `${history.location.pathname}?${search.toString("")}`;
    history.push(url);
    getServicesData(history);
  }
  function reset() {
    history.push("/catalog");
    getServicesData(history);
  }

  function handleClick(id) {
    deleteService(id);
  }
  return (
    <div className='main'>
      {user.email == "admin@admin.com" ? <AddService /> : ""}
      <h1 className="serviceList-title">Перечень услуг</h1>
      <div className="filter">
        <Grid>
          <p>Фильтрация по цене</p>
          <FormControl component="fieldset">
            <RadioGroup
              className="group"
              onChange={(e) => fetchProducts("price_lte", e.target.value)}
              arial-label="price"
              name="price"
            >
              <FormControlLabel value="1000" control={<Radio />} label="1000" />
              <FormControlLabel value="2500" control={<Radio />} label="2500" />
              <FormControlLabel value="5000" control={<Radio />} label="5000" />
              <FormControlLabel value="7000" control={<Radio />} label="7000" />
              <FormControlLabel value="8500" control={<Radio />} label="8500" />
              <FormControlLabel
                value="10000"
                control={<Radio />}
                label="10000"
              />
            </RadioGroup>
            <Button variant="contained" color="secondary" onClick={reset}>
              Reset Filter
            </Button>
          </FormControl>
        </Grid>
        <div className="searchContainer">
          <p>Поиск услуг</p>
          <TextField
            variant="outlined"
            color="secondary"
            onChange={(e) => handleValue(e)}
          />
        </div>
      </div>
      <div className="serviceList">
        <ProductCard />
      </div>
      <div className="paginationContainer">
        <Pagination
          color="secondary"
          count={paginationPages}
          page={page}
          onChange={handlePage}
          size="large"
        />
      </div>
    </div>
  );
};

export default Catalog;
