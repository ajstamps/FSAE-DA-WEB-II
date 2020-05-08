
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
                <Icon name="truck"></Icon>
                Frame Page
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
}// import React from 'react';

// export default function FramePage(){
//     return <div>Frame</div>
// } 