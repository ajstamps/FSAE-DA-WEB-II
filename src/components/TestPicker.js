import React,{useState, useEffect} from 'react';
import StyledLineGraph from "./../components/StyledLineGraph";
import { Button, Icon, Header, Dropdown, Menu, Grid, Sidebar, Segment } from 'semantic-ui-react';

// https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/channels

export default function TestPicker(){

    const TestSrc = "https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/tests/";
    const ChannelSrc = "https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/channels";
    const [tests, setTests] = useState([]);
    const [runs, setRuns] = useState([]);
    const [channels, setChannels] = useState([]);

    const [selectedTest, setSelectedTest] = useState( false );
    const [selectedRun, setSelectedRun] = useState( false );
    const [selectecChannel, setSelectedChannel] = useState( false );

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

    return(
        <Segment>
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
        </Segment>
    );
}