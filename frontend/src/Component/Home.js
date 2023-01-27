import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// MUI imports
import { Button, Typography, Grid, AppBar, Toolbar, CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Components
import ComstumCard from './ComstumCard';
import Header from './Header';

// Assets
import city from './/Assets/city.jpg';

const useStyles = makeStyles({
  cityImg:{
    width:"100%",
    height:"100vh",
  },

  overlayText:{
    position:"absolute",
    zIndex: "100",
    top: "100px",
    textAlign: "center",
  },

  hometext:{
    color: "white",
    fontWeight: "bolder",
  },

  homeBtn:{
    fontSize:"3.5rem",
    borderRadius:"15px",
    backgroundColor:"green",
    boxShadow:"3px 3px 3px white"
  },
});

function Home() {
  const [btnColor, setBtnColor] = useState("error");
  const classes = useStyles();
return (
<>
      <div style= {{position: "relative"}}>
      <img src={city} className={classes.cityImg}></img>
      <div className={classes.overlayText}>
        <Typography variant="h1" className={classes.hometext}>FIND YOUR <span style={{color: " green"}}>NEXT PROPRETY</span> ON DAARI WEBSITE</Typography>
        <Button variant='contained' className={classes.homeBtn}>SEE ALL PROPRETIES</Button>
      </div>
      </div>
  </>
  );
}

export default Home