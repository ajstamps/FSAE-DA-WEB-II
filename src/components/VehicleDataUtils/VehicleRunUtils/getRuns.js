import React, { Component } from "react";
import {Run} from "./Run";
import { Menu } from 'semantic-ui-react';

class GetRuns extends Component {
    constructor(props){
        super(props);
        this.state = {
            runs: [],
            selectedRun: false,
            runsLoading: false,
            callWhenClick: props.callWhenClick
        }
    }

    APICall = async (runSrc) => {
        this.setState({
            runsLoading: true
        });

        try{
            const data = await fetch( runSrc );
            const json = await data.json();

            this.setState({
                runs: await json.body.times.map( x => { return { key: x, value: x, text: x } } )
            });

        } catch(e) {
            console.log(`Fetch error: ${e}`);
        }

        this.setState({
            runsLoading: false
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.test === this.props.test) return;

        this.APICall("https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/tests/" + this.props.test);
    }

    render()
    {
        if(this.props.test == null){
            return <Menu.Item>Select Test</Menu.Item>;
        }

        if ( this.state.runsLoading ) {
            return <div>Loading Runs</div>;
        }

        return (
            this.state.runs.map((run) => (<Run key={run.key}
                                               value={run.value}
                                               text={run.text}
                                               active={this.props.selectedRun === run.text}
                                               onClick={(e) => this.props.callWhenClick(e)}/>) )
        );
    }
}

export default GetRuns;