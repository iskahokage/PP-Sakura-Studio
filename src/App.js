import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";
import { authContext } from ".";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import ServiceContextProvider from "./contexts/ServiceContext";
import Routes from "./routes/Routes";
const useStyles = makeStyles(()=>({
  App:{
    background:'#eae0d5'
  }
}))
function App() {
  const { auth } = useContext(authContext);
  const [ user, loading, error ] = useAuthState(auth);
  
  const classes = useStyles()
  if(loading){
    return <Loader/>
  }
  return (
    <div className="App" className={classes.App}>
        <BrowserRouter>
        <ServiceContextProvider>
        {
          user ? (
        
        <Header/>
          ):(
            ''
          )
        }
          <Routes/>
          {
          user ? (
        
        <Footer/>
          ):(
            ''
          )
        }
        </ServiceContextProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
