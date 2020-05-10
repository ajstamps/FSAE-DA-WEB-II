import React, {useState} from "react";
import "semantic-ui-css/semantic.min.css";
import { Menu, Grid } from "semantic-ui-react";
import ReactDOM from 'react-dom';

import "./LandingPage.css";

import FsaeIcon from "../assets/icon.png";

import Homepage from "./Homepage";
import AerodynamicsPage from "./AerodynamicsPage";
import ElectricalPage from "./ElectricalPage";
import FramePage from "./FramePage";
import ControlsPage from "./ControlsPage";
import EnginePage from "./EnginePage";
import ErrorPage from "./ErrorPage";
import AboutPage from "./AboutPage";
import ViewerPage from "./ViewerPage";
// import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function LandingPage(){

    // State infomration. Any changes to state will result in a page refresh.
    const [activeItem, setActiveItem] = useState('Homepage');
    const [activeGraphItem, setActiveGraphItem] = useState(["RPM"]);
    const [isShown, setIsShown] = useState(false);

    // Menu header above the page elements.
    const GeneratedMenu = () => (
        <Menu stackable fluid compact>
            <Menu.Item as={Link} to="/home" >
                <img src={FsaeIcon}/>
            </Menu.Item>
            <Menu.Item as={Link} name="Aerodynamics" icon="plane"                   to="/aerodynamics" />
            <Menu.Item as={Link} name="Electrical"   icon="plug"                    to="/electrical" />
            <Menu.Item as={Link} name="Frame"        icon="truck"                   to="/frame" />
            <Menu.Item as={Link} name="Engine"       icon="tachometer alternate"    to="/engine" />
            <Menu.Item as={Link} name="Controls"     icon="cogs"                    to="/controls" />
            <Menu.Item as={Link} name="Viewer"       icon="box"                     to="/viewer" />
            <Menu.Item as={Link} name="About"        icon="question circle outline" to="/about" position="right"/>
        </Menu>
    );

    // Determines what component is displayed for each link that the user has access to. The switch will select from the first element matched from the top. The errorpage is the default case.
    const DisplayedPage = () => (
        <Switch>
            <Route exact path="/"             component={AboutPage} />
            <Route exact path="/home"         component={AboutPage} />
            <Route exact path="/controls"     component={ControlsPage} />
            <Route exact path="/aerodynamics" component={AerodynamicsPage} />
            <Route exact path="/electrical"   component={ElectricalPage} />
            <Route exact path="/engine"       component={EnginePage} />
            <Route exact path="/frame"        component={FramePage} />
            <Route exact path="/controls"     component={ControlsPage} />
            <Route exact path="/viewer"       component={ViewerPage} />
            <Route exact path="/about"        component={AboutPage} />
            <Route component={ErrorPage} />
        </Switch>
    );
    
    //Main render function
    return(
        <div className={"maxv"}>

            <Router>
                <Grid padded stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <GeneratedMenu/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid padded stackable style={{ height: "100%" }}>
                    <Grid.Row>
                        <Grid.Column>
                            <DisplayedPage/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Router>
        </div>
    );
}