import React, {Component, Suspense} from "react";
import "semantic-ui-css/semantic.min.css";
import { Header, Button, Icon, Menu, Placeholder, Image, Grid, Dropdown } from "semantic-ui-react";
import { Pane, Dialog, Tooltip } from "evergreen-ui";
import ReactDOM from 'react-dom';
import "./LandingPage.css";
import FsaeIcon from "../assets/icon.png";
import Homepage from "./Homepage";
import AerodynamicsPage from "./AerodynamicsPage";
import ElectricalPage from "./ElectricalPage";
import VehicleDynamicsPage from "./VehicleDynamicsPage";
import ControlsPage from "./ControlsPage";
import EnginePage from "./EnginePage";
import ErrorPage from "./ErrorPage";
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class LandingPage extends Component{
  state = {
    activeItem: 'Homepage',
    activeGraphItem: ["RPM"],
    isShown: false
  };
  render(){
    return (
      <div>
        <Grid stackable padded stretched>
          <Grid.Column width="16">
            {this.DisplayedPage()}
          </Grid.Column>
        </Grid>
        {this.AboutDialog()}
      </div>
    );
  }
  SideBar(){
    const { activeGraphItem } = this.state;
    return(
      <Menu vertical fluid>
        <Menu.Item
          name='RPM'
          active={activeGraphItem.some(x => x === 'RPM')}
          onClick={this.handleGraphItemClick}
        >
        </Menu.Item>

        <Menu.Item
          name='Temp 1'
          active={activeGraphItem.some(x => x === 'Temp 1')}
          onClick={this.handleGraphItemClick}
        >

        </Menu.Item>

        <Menu.Item
          name='Temp 2'
          active={activeGraphItem.some(x => x === 'Temp 2')}
          onClick={this.handleGraphItemClick}
        >
        </Menu.Item>
        <Dropdown item text='Categories'>
          <Dropdown.Menu>
            <Dropdown.Item>Electronics</Dropdown.Item>
            <Dropdown.Item>Automotive</Dropdown.Item>
            <Dropdown.Item>Home</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
  AboutDialog(){
      return (
        <Dialog
            isShown={this.state.isShown}
            onCloseComplete={() => this.setState({ isShown: false })}
            hasFooter={false}
            hasHeader={false}
            >
            <Image centered src={FsaeIcon}/>
            <Header textAlign="center" size="huge">FSAE Data Acquisition Software</Header>
            <Header textAlign="center" size="small">Last updated Thursday, Feburary 27, 2020</Header>

        </Dialog>
      );
  }
  DisplayedPage(){
    return (
      <Router>
        {this.Menu()}
        <Switch>
          <Route exact path="/"                 component={Homepage} />
          <Route exact path="/home"             component={Homepage} />
          <Route exact path="/controls"         component={ControlsPage} />
          <Route exact path="/aerodynamics"     component={AerodynamicsPage} />
          <Route exact path="/electrical"       component={ElectricalPage} />
          <Route exact path="/engine"           component={EnginePage} />
          <Route exact path="/vehicle dynamics" component={VehicleDynamicsPage} />
          <Route exact path="/controls"         component={ControlsPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleGraphItemClick = (e, { name }) => {
    const {activeGraphItem} = this.state;
    if(activeGraphItem.some( x => x == name )) this.setState({ activeGraphItem: activeGraphItem.filter( x => x != name ) });
    else this.setState({ activeGraphItem: [name, ...activeGraphItem] });
  };
  Menu(){
    const {activeItem} = this.state;
    const homeLink = { name: "Homepage", to: "/" };
    const menuItems = [
      { 
        name: "Home",
        to:   "/",
        children: <img src={FsaeIcon}/>
      },{ 
        name: "Aerodynamics",
        to:   "/aerodynamics",
        icon: "plane"
      },{ 
        name: "Electrical",
        to: "/electrical",
        icon: "plug" 
      },{
        name: "Vehicle Dynamics", 
        to: "/vehicle dynamics",  
        icon: "truck" 
      },{ 
        name: "Engine",
        to: "/engine",
        icon: "tachometer alternate" 
      },{ 
        name: "Controls",
        to: "/controls",
        icon: "cogs" 
      },{ 
        name: "About",
        icon: "question circle outline", 
        position: "right", 
        onClick: () => this.setState( {isShown: true} ) 
      }
    ]
    return(
      <Menu stackable>
        { menuItems.map( x => <Menu.Item as={Link} {...x}/> ) }
      </Menu>
    );
  }
}

//aero, electrical, vehicle dynamics, engine, controls


// const LandingPage = () => (
//   <Grid verticalAlign='middle' columns={5}>
//     {
//       Selection.map( function(Item, Index){
//         return SelectionItem(Item);
//       } )
//     }
//   </Grid>
// );
// export default class TeamMenu extends Component {
//   state = { activeItem: Selection[0] }

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//   SelectionItem( Item ){
//     return (
//       <Segment>
//         <Placeholder>
//           <Placeholder.Header/>
//         </Placeholder>
//         <Card.Content>
//           <Placeholder>
//             <Placeholder.Line />
//             <Placeholder.Line />
//             <Placeholder.Line />
//             <Placeholder.Line />
//             <Placeholder.Line />
//           </Placeholder>
//         </Card.Content>
//       </Segment>
//     )
//   }

//   render() {
//     const { activeItem } = this.state;
//     const MenuItems = Selection.map( Item => this.SelectionItem(Item) );
//     const Fallback = () => (
//       <Card>
//         <Placeholder>
//           <Placeholder.Image square/>
//         </Placeholder>
//         <Card.Content>
//           <Placeholder>
//             <Placeholder.Line />
//             <Placeholder.Line />
//             <Placeholder.Line />
//             <Placeholder.Line />
//             <Placeholder.Line />
//           </Placeholder>
//         </Card.Content>
//       </Card>
//     );

//     return (
//       <div>{MenuItems}</div>
//     )
//   }
// }