import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// React leaflet
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Polygon,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
// MUI
import {
  Grid,
  AppBar,
  Typography,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CircularProgress,
  IconButton,
  CardActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import RoomIcon from "@mui/icons-material/Room";

// Map icons
import houseIconPng from "./Assets/Mapicons/house.png";
import appartmentIconPng from "./Assets/Mapicons/apartment.png";
import officeIconPng from "./Assets/Mapicons/office.png";

// Assets
import img1 from "./Assets/img1.jpg";
import myListings from "./Assets/Data/Dummydata";
import polygonOne from "./shape";

const useStyle = makeStyles({
  cardStyle: {
    margin: "0.2rem",
    border: "1px solid black",
    position: "relative",
  },
  pictureStyle: {
    paddingRight: "1rem",
    paddingLeft: "1rem",
    height: "20rem",
    width: "30rem",
  },
  priceOverlay: {
    position: "absolute",
    backgroundColor: "green",
    zIndex: "1000",
    color: "White",
    top: "100px",
    left: "20px",
    padding: "5px",
  },
});

function Listings() {
  // fetch('http://127.0.0.1:8000/api/listings/')
  //   .then(response=> response.json())
  //   .then(data=>console.log(data));

  const classes = useStyle();
  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconsize: [40, 40],
  });

  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconsize: [40, 40],
  });

  const appartmentIcon = new Icon({
    iconUrl: appartmentIconPng,
    iconsize: [40, 40],
  });

  const [latitude, setLatitude] = useState(51.541078280085614);
  const [longitude, setLongitude] = useState(-0.12505647664960406);

  const initialState = {
    mapInstance: null,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "getMap":
        draft.mapInstance = action.mapData;
        break;
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  function TheMapComponent() {
    const map = useMap();
    dispatch({ type: "getMap", mapData: map });
    return null;
  }

  function GoEast() {
    setLatitude(51.49874223256697);
    setLongitude(0.266331470524932);
  }

  function GoCenter() {
    setLatitude(51.50558106499696);
    setLongitude(-0.12505647664960406);
  }

  const polyOne = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ];

  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await Axios.get(
          'http://127.0.0.1:8000/api/listings/',
          { cancelToken: source.token }
        );
        // console.log(response.data);
        setAllListings(response.data);
        setDataIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }
    GetAllListings();
    return () => {
      source.cancel();
    };
  }, []);

  if (dataIsLoading === false) {
    console.log(allListings[0].location);
  }

  if (dataIsLoading === true) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="justify"
        style={{ height: "100vh" }}
      >
        <CircularProgress color="success" />
      </Grid>
    );
  }

  return (
    <Grid container>
      {/* xs should be 4 below in the normal app */}
      <Grid item xs={3}>
        {allListings.map((listing) => {
          return (
            <Card key={listing.id} className={classes.cardStyle}>
              <CardHeader
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={() =>
                      state.mapInstance.flyTo(
                        [listing.latitude, listing.longitude],
                        16
                      )
                    }
                  >
                    <RoomIcon />
                  </IconButton>
                }
                title={listing.title}
              />
              <CardMedia
                className={classes.pictureStyle}
                component="img"
                image={listing.picture1}
                alt={listing.title}
              />
              <CardContent>
                <Typography variant="body2">
                  {listing.description.substring(0, 200)}...
                </Typography>
              </CardContent>
              {listing.property_status === "Sale" ? (
                <Typography className={classes.priceOverlay}>
                  {listing.listing_type}: $
                  {listing.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
              ) : (
                <Typography className={classes.priceOverlay}>
                  {listing.listing_type}: $
                  {listing.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  / {listing.rental_frequency}
                </Typography>
              )}

              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  {listing.seller_username}
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
      {/* xs should be 8 below in the normal app */}
      <Grid item xs={9} style={{ marginTop: "0.5rem" }}>
        <AppBar position="sticky">
          <div style={{ height: "100vh" }}>
            <MapContainer
              center={[51.541078280085614, -0.15871891189601836]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <TheMapComponent />

              {allListings
                .filter(
                  (element) =>
                    element.latitude !== null && element.longitude !== null
                )
                .map((listing) => {
                  function IconDisplay() {
                    if (listing.listing_type === "House") {
                      return houseIcon;
                    } else if (listing.listing_type === "Apartment") {
                      return appartmentIcon;
                    } else if (listing.listing_type === "Office") {
                      return officeIcon;
                    }
                  }
                  return (
                    <Marker
                      key={listing.id}
                      icon={IconDisplay()}
                      position={[listing.latitude, listing.longitude]}
                    >
                      <Popup>
                        <Typography variant="h5">{listing.title}</Typography>
                        <img
                          src={listing.picture1}
                          style={{ height: "14rem", width: "18rem" }}
                        />
                        <Typography variant="body1">
                          {listing.description.substring(0, 150)}...
                        </Typography>
                        <Button variant="contained" fullWidth>
                          Details
                        </Button>
                      </Popup>
                    </Marker>
                  );
                })}
              {/* <Marker icon={houseIcon} position = {[latitude, longitude]}>
    <Popup>
      <Typography variant = "h5">A title</Typography>
      <img src={img1} style={{height: "14rem", width: "18rem"}}/>
      <Typography variant = "body1">This is some text below the title</Typography>
      <Button variant="contained" fullWidth>A link</Button>
    </Popup>
  </Marker> */}
            </MapContainer>
          </div>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default Listings;
