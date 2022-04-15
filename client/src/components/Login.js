import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress } from "@mui/material";
import LoginButton from './LoginButton';
import App from '../App';


export default function Login() {

  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <CircularProgress color="inherit" size={30} />;
  }
  var button;
  if (isAuthenticated) {
    button = <App />
  }else{ 
      button = <LoginButton />
  }

  return (
    <div>{button}</div>
  );
}
