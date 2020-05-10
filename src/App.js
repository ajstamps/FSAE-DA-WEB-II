import React, {Component} from 'react';
import LandingPage from "./pages/LandingPage";
import {Grid, Container, Image} from "semantic-ui-react";
import LoginForm from "./components/LoginForm"
import LoginPage from "./pages/LoginPage"
import ThemeBg from "./components/ThemeBg"
import ErrorPage from "./pages/ErrorPage"

let ActivePage = "landing"

class App extends Component {
  render() {
    return (
  <React.Fragment>
        <LandingPage/>
  </React.Fragment>
    );
  }
}
// function App() { 
//   // switch(ActivePage){
//   //   case "landing": return <LandingPage/>;
//   //   default: return <ErrorPage/>;
//   // }
// }

export default App;
