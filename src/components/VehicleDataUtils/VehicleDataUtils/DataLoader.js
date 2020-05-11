import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';
import StyledLineGraph from "../../../components/StyledLineGraph";

class DataLoader extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns: [],
            binding: [],
            dataLoading: false
        }
    }

    APICall = async (runSrc) => {
        this.setState({
            dataLoading: true
        });

        try{
            const raw    = await fetch( runSrc );
            const json   = await raw.json();
            const header = await json.body.channel;
            const time   = await json.body.time;
            const data   = await json.body.data;

            this.setState({
                columns: [
                    [ await header, ...(await data) ],
                    [ "time", ...(await time) ]
                ],
                binding: await header
            });

        }catch( e ){
            console.log(`Fetch error: ${e}`);
        }

        this.setState({
            dataLoading: false
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.test === this.props.test &&
            prevProps.run === this.props.run &&
            prevProps.channel === this.props.channel) return;

        this.APICall("https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/tests/"
            + this.props.test + "/" + this.props.run + "?channel=" + this.props.channel);
    }

    render(){
        return (
            <Grid stretched style={{marginLeft:17+"em"}}>
                <Grid.Row>
                    <Grid.Column>
                        <StyledLineGraph
                            loading={this.state.dataLoading}
                            data={this.state.columns}
                            bind={this.state.binding}
                            points={true}
                            subchart
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default DataLoader;