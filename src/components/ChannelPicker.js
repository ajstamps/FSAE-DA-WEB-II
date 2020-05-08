import React,{useState} from 'react';
import StyledLineGraph from "./../components/StyledLineGraph";
import { Button, Segment, List, Radio, Select } from 'semantic-ui-react';

// https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/channels

export default function ChannelPicker(){

    const ChannelSrc = "https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/channels";
    const [channels, setChannels] = useState([]);

    function RequestChannels(){

        fetch( ChannelSrc )
            .then( r => r.json() )
            .then( d => setChannels( d.body.channels ) )
            .catch( e => {
                console.log(`Fetch error: ${e}`);
            } );

    };
    RequestChannels = RequestChannels.bind(this);

    return(
        <Segment>
            <Select 
                placeholder={"Select a channel"} 
                onClick={RequestChannels} 
                options={channels.map( x => { return { key: x, value: x, text: x } } )}
            />
        </Segment>
    );
}