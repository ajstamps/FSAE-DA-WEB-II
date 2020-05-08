
import React,{useState, useEffect} from 'react';
import StyledLineGraph from "../components/StyledLineGraph";
import { Button, Icon, Header, Dropdown, Menu, Grid } from 'semantic-ui-react';
import StyledDygraph from './StyledDygraph';
// import ChannelPicker from '../components/ChannelPicker';


export default function ViewerPage(){

    const [columns, setColumns] = useState( [] );
    const [binding, setBinding] = useState( [] );
    // const [channels, setChannels] = useState( undefined );
    const [channelLoading, setChannelLoading] = useState( false );
    const [dataLoading, setDataLoading] = useState( false );
    const [selectedItem, setSelectedItem] = useState( false );
    const [channelList, setChannelList] = useState( undefined );

    async function RequestChannels(e,d){

        setChannelLoading(true);

        const ChannelSrc = "https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/channels";
    
        try{
            const data = await fetch( ChannelSrc );
            const json = await data.json();
            // setChannels( await json.body.channels );
            setChannelList( await json.body.channels.map( x => { return { key: x, value: x, text: x } } ) );
        } catch(e) {
            console.log(`Fetch error: ${e}`);
        }
        
        setChannelLoading(false);

    }
    async function LoadData(e,d) {
        const dataSrc = `https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/tests/2020-04-28/17:04:57?channel=${selectedItem}`;
        
        setDataLoading(true);

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
            setBinding( {
                [await header]: "time"
            } );

        }catch( e ){
            console.log(`Fetch error: ${e}`);
        }

        setDataLoading(false);

    }
    async function LoadDygraphData(e,d) {
        const dataSrc = `https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/tests/2020-04-28/17:04:57?channel=${selectedItem}`;
        
        setDataLoading(true);

        try{
            const raw    = await fetch( dataSrc );
            const json   = await raw.json();
            const header = await json.body.channel;
            const time   = await json.body.time;
            const data   = await json.body.data;

            setColumns(
                await data.map( (x,i) => [x,data[i]] )
            );
            setBinding( 
                ["time", header]
            );

        }catch( e ){
            console.log(`Fetch error: ${e}`);
        }

        setDataLoading(false);

    }
    
    return (
        <div>
            <Header as="h1">
                <Icon name="plane"/>
                Aerodynamics Page
            </Header>
            <Menu attached="bottom">
                <Menu.Item color="red" onClick={LoadData}>
                    Fetch Data
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Dropdown
                            placeholder="Select a channel"
                            onClick={RequestChannels}
                            onChange={(e, {value}) => setSelectedItem(value)}
                            loading={channelLoading}
                            options={channelList}
                            clearable
                            lazyLoad
                            selection
                            // search
                            // fluid
                        />
                    </Menu.Item>
                </Menu.Menu>

                {/* <StyledDygraph title={binding[1]} ylabel={binding[1]} data={columns} bind={binding} loading={dataLoading}/> */}
            </Menu>
            <Grid stretched>
                <Grid.Row>
                    <Grid.Column>
                        <StyledLineGraph 
                            loading={dataLoading}
                            data={columns}
                            bind={binding}
                            points={true}
                            subchart
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}


// import React, { useState, useEffect, componentRef, Suspense, SuspenseList } from 'react';
// import { Grid, Segment, Placeholder } from 'semantic-ui-react';
// import Chart from 'react-c3-component';
// import Conf from "../Config.json"
// import 'c3/c3.css';
// import { Card, Spinner, Pane } from 'evergreen-ui';
// import StyledLineGraph from '../components/StyledLineGraph';

// export default function AerodynamicsPage(){
//     const Bigarr = [...Array(100).keys(), ...Array(100).reverse().keys(),...Array(100).keys(), ...Array(100).reverse().keys()];
//     const BigarrX = [...Array(400).keys()];
//     const Columns1 = [
//         ['x1', ...BigarrX],
//         ['x2', ...BigarrX],
//         ['RPM', ...Bigarr],
//         ['Temp1', ...Bigarr],
//     ];
//     const Columns2 = [
//         ['x1', ...BigarrX.slice(200, 400)],
//         ['x2', ...BigarrX.slice(200, 400)],
//         ['RPM', ...Bigarr.slice(200, 400)],
//         ['Temp1', ...Bigarr.slice(200, 400)],
//     ];
//     const Columns3 = [
//         ['x1', ...BigarrX.slice(250, 400)],
//         ['x2', ...BigarrX.slice(250, 400)],
//         ['RPM', ...Bigarr.slice(250, 400)],
//         ['Temp1', ...Bigarr.slice(250, 400)],
//     ];
//     const Columns4 = [
//         ['x1', 41, 23, 36, 54, 57, 208],
//         ['x2', 91, 64, 56, null, 38, 220],
//         ['RPM', 30, 200, 10, 400, 150, 250],
//         ['Temp1', 90, 97, 99, 110, 120]
//     ];
//     const Binding = {
//         RPM: 'x1',
//         Temp1: 'x2'
//     };
//     const ColumnNames = Columns1.map(x => x[0]);

//     return (
//         <Grid stackable>
//             <Grid.Row>
//                 <Grid.Column widescreen="16" largeScreen="16" computer="16" tablet="16" mobile="16">
//                     <StyledLineGraph data={Columns1} bind={Binding}/>
//                 </Grid.Column>
//             </Grid.Row>
//             <Grid.Row>
//                 <Grid.Column widescreen="16" largeScreen="16" computer="16" tablet="16" mobile="16">
//                     <StyledLineGraph data={Columns2} bind={Binding}/>
//                 </Grid.Column>
//             </Grid.Row>
//             <Grid.Row>
//                 <Grid.Column widescreen="16" largeScreen="16" computer="16" tablet="16" mobile="16">
//                     <StyledLineGraph data={Columns3} bind={Binding}/>
//                 </Grid.Column>
//             </Grid.Row>
//             <Grid.Row>
//                 <Grid.Column widescreen="16" largeScreen="16" computer="16" tablet="16" mobile="16">
//                     <StyledLineGraph data={Columns4} bind={Binding}/>
//                 </Grid.Column>
//             </Grid.Row>
//         </Grid>
//     );
// } 