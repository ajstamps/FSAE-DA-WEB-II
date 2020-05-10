
import React,{useState, useEffect} from 'react';
import StyledLineGraph from "../components/StyledLineGraph";
import { Button, Icon, Header, Dropdown, Menu, Grid, Sidebar, Segment } from 'semantic-ui-react';
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

    const TestSrc = "https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/tests/";
    const ChannelSrc = "https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/channels";
    const [tests, setTests] = useState([]);
    const [runs, setRuns] = useState([]);
    const [channels, setChannels] = useState([]);

    const [selectedTest, setSelectedTest] = useState( false );
    const [selectedRun, setSelectedRun] = useState( false );
    const [selectedChannel, setSelectedChannel] = useState( false );

    const [testsLoading, setTestsLoading] = useState( false );
    const [runsLoading, setRunsLoading] = useState( false );
    const [ChannelsLoading, setChannelsLoading] = useState( false );

    async function RequestTests(){

        setTestsLoading(true);

        try{
            const data = await fetch( TestSrc );
            const json = await data.json();
            setTests( await json.body.dates.map( x => { return { key: x, value: x, text: x } } ) );
        } catch(e) {
            console.log(`Fetch error: ${e}`);
        }

        setTestsLoading(false);
    };

    async function RequestRuns(){

        setRunsLoading(true);

        try{
            const data = await fetch( TestSrc.concat(selectedTest) );
            const json = await data.json();
            setRuns( await json.body.times.map( x => { return { key: x, value: x, text: x } } ) );
        } catch(e) {
            console.log(`Fetch error: ${e}`);
        }

        setRunsLoading(false);
    };

    async function RequestChannels(e,d){

        setChannelsLoading(true);

        const ChannelSrc = "https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/channels";
    
        try{
            const data = await fetch( ChannelSrc );
            const json = await data.json();
            // setChannels( await json.body.channels );
            setChannels( await json.body.channels.map( x => { return { key: x, value: x, text: x } } ) );
        } catch(e) {
            console.log(`Fetch error: ${e}`);
        }
        
        setChannelsLoading(false);

    }

    async function LoadData(e,d) {
        const dataSrc = `https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/tests/${selectedTest}/${selectedRun}?channel=${selectedChannel}`;
        
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
    
    return (
        <div>
            <Header as="h1" style={{marginLeft:17+"em"}}>
                <Icon name="plane"/>
                Aerodynamics Page
            </Header>
            <Menu borderless vertical stackable fixed='left' className='side-nav'>
            <Menu.Item>
                <Dropdown
                    placeholder="Select a test"
                    onClick={RequestTests}
                    onChange={(e, {value}) => setSelectedTest(value)}
                    loading={testsLoading}
                    options={tests}
                    clearable
                    lazyLoad
                    selection
                    // search
                    // fluid
                />
            </Menu.Item>
            <Menu.Item>
                <Dropdown
                    placeholder="Select a run"
                    onClick={RequestRuns}
                    onChange={(e, {value}) => setSelectedRun(value)}
                    loading={runsLoading}
                    options={runs}
                    clearable
                    lazyLoad
                    selection
                    // search
                    // fluid
                />
            </Menu.Item>
            <Menu.Item>
                <Dropdown
                    placeholder="Select a channel"
                    onClick={RequestChannels}
                    onChange={(e, {value}) => setSelectedChannel(value)}
                    loading={ChannelsLoading}
                    options={channels}
                    clearable
                    lazyLoad
                    selection
                    // search
                    // fluid
                />
            </Menu.Item>
            <Menu.Item color="red" onClick={LoadData}>
                    Fetch Data
            </Menu.Item>
            </Menu>
            <Grid stretched style={{marginLeft:17+"em"}}>
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