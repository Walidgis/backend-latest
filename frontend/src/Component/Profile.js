import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Context
import StateContext from "../Contexts/StateContext";

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
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  formContainer: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3rem",
    border: "5px solid black",
    padding: "3rem",
  },
  loginBtn: {
    backgroundColor: "green",
    color: "white",
    fontSize: "1.1rem",
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  picturesBtn: {
    backgroundColor: "blue",
    color: "white",
    fontSize: "0.8rem",
    border: "1px solid black",
    marginLeft: "1rem",
  },
});

function Profile() {
  const classes = useStyle();
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const initialState = {
    userProfile: {
      agencyName: "",
      phoneNumber: "",
    },
    agencyNameValue: "",
    phoneNumberValue: "",
    bioValue: "",
    uploadedPicture: [],
    profilePictureValue: "",
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.agencyName = action.profileObject.agency_Name;
        draft.userProfile.phoneNumber = action.profileObject.phone_Number;
        break;

      case "catchAgencyNameChange":
        draft.agencyNameValue = action.agencyNameChosen;
        break;

      case "catchPhoneNumberChange":
        draft.phoneNumberValue = action.phoneNumberChosen;
        break;

      case "catchBioChange":
        draft.bioValue = action.bioChosen;
        break;

      case "catchUploadedPictureChange":
        draft.uploadedPictureValue = action.uploadedPictureChosen;
        break;

      case "catchProfilePictureChange":
        draft.profilePictureValue = action.profilePictureChosen;
        break;

      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  //   use effect to catch uploaded picture
  useEffect(() => {
    if (state.uploadedPicture[0]) {
      dispatch({
        type: "catchProfilePictureChange",
        profilePictureChosen: state.uploadedPicture[0],
      });
    }
  }, [state.uploadedPicture[0]]);

  // request to get profile info
useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://localhost:8000/api/profiles/${GlobalState.userId}/`
        );
        console.log(response.data);
        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
        });
      } catch (e) {
        console.log(e.response);
      }
    }
    GetProfileInfo();
  }, []);

  //   use Effect to send the request
  useEffect(() => {
    if (state.sendRequest) {
      async function UpdateProfile() {
        const formData = new FormData();
        formData.append("agency_name", state.agencyNameValue);
        formData.append("phone_number", state.phoneNumberValue);
        formData.append("bio", state.bioValue);
        formData.append("profile_picture", state.profilePictureValue);
        formData.append("seller", GlobalState.userId);

        try {
          const response = await Axios.patch(
            `
          http://localhost:8000/api/profiles/${GlobalState.userId}/update/`,
            formData
          );
          console.log(response.data);
          //   navigate("/listings");
        } catch (e) {
          console.log(e.response);
        }
      }
      UpdateProfile();
    }
  }, [state.sendRequest]);

  function FormSubmit(e) {
    e.preventDefault();
    dispatch({ type: "changeSendRequest" });
  }

  return (
    <>
      <div>
        <Typography
          variant="h4"
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          Welcome{" "}
          <span style={{ color: "green", fontWeight: "bolder" }}>
            {GlobalState.userUsername}
          </span>
          , please submit this form below to update your profile.
        </Typography>
      </div>

      <div className={classes.formContainer}>
        <form onSubmit={FormSubmit}>
          <Grid item container justifyContent="center">
            <Typography variant="h4">MY PROFILE</Typography>
          </Grid>

          <Grid item container style={{ marginTop: "1rem" }}>
            <TextField
              id="agencyName"
              label="Agency Name*"
              variant="outlined"
              fullWidth
              value={state.agencyNameValue}
              onChange={(e) =>
                dispatch({
                  type: "catchAgencyNameChange",
                  agencyNameChosen: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item container style={{ marginTop: "1rem" }}>
            <TextField
              id="phoneNumber"
              label="Phone Number*"
              variant="outlined"
              fullWidth
              value={state.phoneNumberValue}
              onChange={(e) =>
                dispatch({
                  type: "catchPhoneNumberChange",
                  phoneNumberChosen: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item container style={{ marginTop: "1rem" }}>
            <TextField
              id="bio"
              label="Bio"
              variant="outlined"
              multiline
              rows={6}
              fullWidth
              value={state.bioValue}
              onChange={(e) =>
                dispatch({
                  type: "catchBioChange",
                  bioChosen: e.target.value,
                })
              }
            />
          </Grid>

          <Grid
            item
            container
            xs={6}
            style={{
              marginTop: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              variant="contained"
              component="label"
              fullWidth
              className={classes.picturesBtn}
            >
              PROFILE PICTURE
              <input
                type="file"
                multiple
                accept="image/png, image/gif, image/jpeg"
                hidden
                onChange={(e) =>
                  dispatch({
                    type: "catchUploadedPicture",
                    pictureChosen: e.target.files,
                  })
                }
              />
            </Button>
          </Grid>

          <Grid item container>
            <ul>
              {state.profilePictureValue ? (
                <li>{state.profilePictureValue.name}</li>
              ) : (
                ""
              )}
            </ul>
          </Grid>

          <Grid
            item
            container
            xs={8}
            style={{
              marginTop: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              type="submit"
              className={classes.loginBtn}
            >
              UPDATE
            </Button>
          </Grid>
        </form>
      </div>
    </>
  );
}

export default Profile;
