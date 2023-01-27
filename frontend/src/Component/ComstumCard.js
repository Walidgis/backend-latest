import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  divStyle: {
    width: "100%",
    border:"2px solid green",
    padding: "15%",
  },

  btnStyle: {
    backgroundColor : "yellow",
  },
});

function ComstumCard() {
    const [btnColor, setBtnColor] = useState("error");
    const classes = useStyles();
  return (
    <div className = {classes.divStyle}>
    <Typography variant="h4">This is the title </Typography>
    <Typography variant="body1">On sait depuis longtemps que travailler 
    avec du texte lisible et contenant du sens 
    est source de distractions, et empêche de se c
    oncentrer sur la mise en page elle-même. 
    L'avantage du Lorem Ipsum sur un texte générique 
    comme 'Du texte. Du texte. Du texte.' est qu'il 
    possède une distribution de lettres plus ou moins
    normale, et en tout cas comparable avec celle du 
    français standard. De nombreuses suites logicielles
    de mise en page ou éditeurs de sites Web ont
    ait du Lorem Ipsum leur faux texte par défaut,
    t une recherche pour 'Lorem Ipsum' vous 
    onduira vers de nombreux sites qui n'en sont
    encore qu'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement 
    (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes). </Typography>
     <Button onClick={() => setBtnColor("success")} 
      variant="contained" 
      size = "Medium"
      className = {classes.btnStyle}
      >
  
      GO 
    </Button>
    </div>
  );
}

export default ComstumCard