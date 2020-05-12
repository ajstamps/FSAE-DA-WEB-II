import React, { Component } from "react";
import {Channel} from "./Channel";

class GetChannels extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channelsSrc: "https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/channels/",
            channels: [],
            selectedChannel: false,
            channelsLoading: false,
            callWhenClick: props.callWhenClick
        }
    }

    componentDidMount = async () => {
        this.setState({
            channelsLoading: true
        });

        try{
            const data = await fetch( this.state.channelsSrc );
            const json = await data.json();

            this.setState({
                channels: await json.body.channels.map( x => { return { key: x, value: x, text: x } } )
            });

        } catch(e) {
            console.log(`Fetch error: ${e}`);
        }

        this.setState({
            channelsLoading: false
        });
    };

    render()
    {
        if ( this.state.channelsLoading ) {
            return <div>Loading Channels</div>;
        }
        return (
            this.state.channels.map((channel) => (<Channel key={channel.key}
                                                           value={channel.value}
                                                           text={channel.text}
                                                           active={this.props.selectedChannels.includes(channel.text)}
                                                           onClick={(e) => this.props.callWhenClick(e)}/>) )
        );
    }
}

export default GetChannels;