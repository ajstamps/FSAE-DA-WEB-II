import React, {Component} from 'react';
import StyledLineGraph from "../../../components/StyledLineGraph";
import PropTypes from "prop-types";
import {GithubPicker} from 'react-color';
import reactCSS from 'reactcss';

class DataLoader extends Component {
    static propTypes = {
        channel: PropTypes.string,
        test: PropTypes.string,
        run: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            binding: [],
            dataLoading: false,
            header: "",
            color: '#ff0011',
            displayColorPicker: false,
            updateGraphs: false
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
                columns: [[await header, ...(await data)], ["time", ...(await time)]],
                binding: await header,
                header: await header
            });
        } catch (e) {
            console.log(`Fetch error: ${e}`);
        }

        this.setState({
            dataLoading: false
        });
    }

    componentDidMount() {
        this.APICall("https://1md185v9lg.execute-api.us-east-2.amazonaws.com/dev/cars/1/tests/"
            + this.props.test + "/" + this.props.run + "?channel=" + this.props.channel);
    }

    handleChange = (color) => {
        this.setState({ color: color.hex });
        this.handleClose();
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false });
    };

    render() {
        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: this.state.color,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        if (this.state.dataLoading){
            return (<div>Loading...</div>)
        }

        return (
            <div style={{backgroundColor: "lightgrey", padding:"40px"}}>
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <GithubPicker color={ this.state.color } onChange={ this.handleChange } />
                </div> : null }

                <StyledLineGraph
                    loading={this.state.dataLoading}
                    data={this.state.columns}
                    bind={this.props.channel}
                    points={true}
                    title={this.state.header}
                    color={this.state.color}
                    update={this.state.updateGraphs}
                    subchart
                />
            </div>
        )
    }
}

export default DataLoader;