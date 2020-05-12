import React, {Component} from 'react';
import StyledLineGraph from "../../../components/StyledLineGraph";

class DataLoader extends Component {
    constructor(props) {
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

        try {
            const raw = await fetch(runSrc);
            const json = await raw.json();
            const header = await json.body.channel;
            const time = await json.body.time;
            const data = await json.body.data;

            this.setState({
                columns: [
                    [await header, ...(await data)],
                    ["time", ...(await time)]
                ],
                binding: await header
            });
        } catch (e) {
            console.log(`Fetch error: ${e}`);
            console.log("error");
        }

        this.setState({
            dataLoading: false
        });
    }

    componentDidMount() {
        this.APICall("https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/tests/"
            + this.props.test + "/" + this.props.run + "?channel=" + this.props.channel);
    }

    render() {
        if (this.state.dataLoading){
            return (<div>Loading...</div>)
        }

        return (
            <StyledLineGraph
                loading={this.state.dataLoading}
                data={this.state.columns}
                bind={this.state.binding}
                points={true}
                subchart
            />
        )
    }
}

export default DataLoader;