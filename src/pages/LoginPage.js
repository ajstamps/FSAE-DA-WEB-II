import React from 'react';
import LandingPage from "./LandingPage";
import {Grid, Container, Image} from "semantic-ui-react";
import LoginForm from "../components/LoginForm"
import ThemeBg from "../components/ThemeBg"

function LoginPage() {
  return (
    <div style={{backgroundColor: "#911c1c"}}>
      <LoginForm/>
    </div>
  );
}

export default LoginPage;
