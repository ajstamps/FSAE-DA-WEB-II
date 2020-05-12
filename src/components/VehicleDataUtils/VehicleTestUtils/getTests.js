import React, { Component } from "react";
import {Test} from "./Test";

class GetTests extends Component {
    constructor(props){
        super(props);
        this.state = {
            testSrc: "https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/tests/",
            tests: [],
            testsLoading: false,
            callWhenClick: props.callWhenClick
        }
    }

    componentDidMount = async () => {
        this.setState({
            testsLoading: true
        });

        try{
            const data = await fetch( this.state.testSrc );
            const json = await data.json();

            this.setState({
                tests: await json.body.dates.map( x => { return { key: x, value: x, text: x } } )
            });

        } catch(e) {
            console.log(`Fetch error: ${e}`);
        }

        this.setState({
            testsLoading: false
        });
    };

    render()
    {
        if ( this.state.testsLoading ) {
            return <div>Loading Tests</div>;
        }
        return (
            this.state.tests.map((test) => (<Test key={test.key}
                                                  value={test.value}
                                                  text={test.text}
                                                  active={this.props.selectedTest === test.text}
                                                  onClick={(e) => this.props.callWhenClick(e)}/>) )
        );
    }

}

export default GetTests;