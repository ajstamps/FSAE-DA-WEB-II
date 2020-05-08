import React,{useState, useEffect} from 'react';
import StyledLineGraph from "../components/StyledLineGraph";
import { Header, Segment, Icon, Menu, Grid } from 'semantic-ui-react';
import StyledDygraph from './StyledDygraph';
// import ChannelPicker from '../components/ChannelPicker';

export default function ViewerPage(){

    const channels = ["Throttle Position", "Manifold Pressure"];

    const [columns, setColumns] = useState( {
        ["RPM"]:               [],
        ["Coolant Pressure"]:  [],
        ["Fuel Pressure"]:     [],
        ["Throttle Position"]: [],
        ["Manifold Pressure"]: []
    } );
    const [dataLoading, setDataLoading] = useState( {
        ["RPM"]:               false,
        ["Coolant Pressure"]:  false,
        ["Fuel Pressure"]:     false,
        ["Throttle Position"]: false,
        ["Manifold Pressure"]: false
    } );
    async function LoadData(name) {
        const dataSrc = `https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/tests/2020-04-28/17:04:57?channel=${name}`;
        
        setDataLoading( {[name]: true} );

        try{
            const raw    = await fetch( dataSrc );
            const json   = await raw.json();
            const header = await json.body.channel;
            const time   = await json.body.time;
            const data   = await json.body.data;

            setColumns( [
                [ await header, ...(await data) ],
                [ "time", ...(await time) ]
            ] );

        }catch( e ){
            console.log(`Fetch error: ${e}`);
        }

        setDataLoading( {[name]: false} );

    }
    function CreateRow( name ){
        return (
            <Grid.Row>
                <Grid.Column>
                    <Segment.Group raised>
                        <Segment color="red">
                            <Header as="h1">{name}</Header>
                        </Segment>
                        <StyledLineGraph 
                            loading={ dataLoading[name] }
                            data={ columns[name] }
                            bind={ { [name]: "time" } }
                            points={true}
                            subchart
                        />  
                    </Segment.Group>
                </Grid.Column>
            </Grid.Row>
        );
    }

    // useEffect( () => {
    //     var cols = {};
    //     for (let [key, value] of Object.entries(columns)) {
    //         cols[key] = LoadData(key);
    //     }
    //     setColumns(cols)
    // }, [] );

    return (
        <div>
            <Header as="h1">
                <Icon name="cogs"></Icon>
                Controls Page
            </Header>
            <Grid stretched>
                { channels.map(x => CreateRow( x ) ) }
            </Grid>
        </div>
    );
}

// import React from 'react';

// export default function EnginePage(){
//     return <div>YEETER PEETER</div>
// } 

// import React, {Component} from 'react';
// import GridLayout from "../components/GridLayout"
// import StyledLineGraph from '../components/StyledLineGraph';
// import PropTypes from "prop-types";
// import { withRouter } from 'react-router-dom';

// const Columns4 = [
//     ['x1', 41, 23, 36, 54, 57, 208],
//     ['x2', 91, 64, 56, null, 38, 220],
//     ['RPM', 30, 200, 10, 400, 150, 250],
//     ['Temp1', 90, 97, 99, 110, 120]
// ];
// const Binding = {
//     RPM: 'x1',
//     Temp1: 'x2'
// };

// export default class ControlsPage extends Component{
//     static propTypes = {
//     }
//     static defaultProps = {
//     }
//     state = {

//     }
//     render(){
//         return (
//             <GridLayout>
//                 <StyledLineGraph data={Columns4} bind={Binding}/>
//             </GridLayout>
//         );
//     }
// }