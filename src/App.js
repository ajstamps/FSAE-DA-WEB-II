import React from 'react';
import LandingPage from "./pages/LandingPage";
import {Grid, Container, Image} from "semantic-ui-react";
import LoginForm from "./components/LoginForm"
import LoginPage from "./pages/LoginPage"
import ThemeBg from "./components/ThemeBg"
import ErrorPage from "./pages/ErrorPage"

let ActivePage = "landing"

function App() { 
  switch(ActivePage){
    case "landing": return <LandingPage/>;
    default: return <ErrorPage/>;
  }
}

export default App;
