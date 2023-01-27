import{BrowserRouter, Route, Routes } from "react-router-dom";
import React, {useEffect} from "react";
import { useImmerReducer } from "use-immer";

// MUI imports
import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Home from "./Component/Home";
import Login from "./Component/Login";
import Listings from "./Component/Listings";
import Header from "./Component/Header";
import Testing from "./Component/Testing";
import Register from "./Component/Register";
import AddProperty from "./Component/AddProperty";
import Profile from "./Component/Profile"; 

// Contexts
import DispatchContext from "./Contexts/DispatchContext";
import StateContext from "./Contexts/StateContext";

function App() {
    const initialState = {
      userUsername: localStorage.getItem('theUserUsername'),
      userEmail: localStorage.getItem('theUserUserEmail'),
      userId:localStorage.getItem('theUserUserId'),
      userToken:localStorage.getItem('theUserUserToken'),
      userIsLogged: localStorage.getItem('theUserUsername') ? true: false,
  };

  function ReducerFunction(draft, action) {
      switch(action.type) {
          case 'catchToken':
            draft.userToken = action.tokenValue;
        break;
      case 'userSignIn':
        draft.userUsername = action.usernameInfo;
        draft.userEmail = action.emailInfo;
        draft.userId = action.IdInfo;
        draft.userIsLogged = true;
        break;
        default:
        break;

      case 'logout':
        draft.userIsLogged = false
        break;
     }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  useEffect(()=>{
    if (state.userIsLogged){
      localStorage.setItem('theUserUsername', state.userUsername)
      localStorage.setItem('theUserUserEmail', state.userEmail)
      localStorage.setItem('theUserUserId', state.userId)
      localStorage.setItem('theUserUserToken', state.userToken)
    }
    else {
      localStorage.removeItem('theUserUsername')
      localStorage.removeItem('theUserUserEmail')
      localStorage.removeItem('theUserUserId')
      localStorage.removeItem('theUserUserToken')
    }
  },[state.userIsLogged]);


    return (
    <StateContext.Provider value={state}>
    <DispatchContext.Provider value={dispatch}>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <CssBaseline/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/addproperty" element={<AddProperty />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/listings" element={<Listings />}/>
          <Route path="/testing" element={<Testing />}/>
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
    </DispatchContext.Provider>
    </StateContext.Provider>
    )
}

export default App;
