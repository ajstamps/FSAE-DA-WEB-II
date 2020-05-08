import React, { Component, Suspense } from 'react';
import { withRouter } from "react-router-dom"
import { PropTypes } from 'prop-types';
import { Grid, Segment, Button, Loader, Dimmer } from 'semantic-ui-react';
import C3 from 'c3';
import 'c3/c3.css';
import AppConfig from "../Config.json"
import { Spinner } from 'evergreen-ui';

export default class StyledLineGraph extends Component{
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.array).isRequired,
        bind: PropTypes.objectOf(PropTypes.string).isRequired,
        subchart: PropTypes.bool,
        point: PropTypes.bool,
        loading: PropTypes.bool
    }
    static defaultProps = {
        data: [],
        bind: {},
        showAverage: false,
        subchart: false,
        points: false,
        jsonUrl: null,
        loading: false
    }
    node = undefined;
    config = {
        tooltip: { 
            grouped: true 
        },
        legend: { 
            show: false,
            position: 'right'
        },
        grid:{
            x: { show: true },
            y: { show: true }
        },
        zoom:{
            enabled: true,
            type: "scroll"
        },
        axis:{
            x: {
                show: false,
                tick: {
                    fit: false,
                    rotate: 90
                }
            }
        }
    };

    constructor(props){
        super(props);
        this.state = {
        };
    }

    asyncGenerateChart = async () => {
        this.setState({loaded: false});
        this.chart = await C3.generate( {
            bindto: this.node,
            data:{
                columns: this.props.data,
                xs: this.props.bind
            },
            point: { 
                show: this.props.points 
            },
            subchart: { 
                show: this.props.subchart 
            },
            ...this.config
        } );
        this.setState({loaded: true});
    }
    asyncReloadProps = async () => {
        await this.chart.load( {
            columns: this.props.data,
            unload: true
        } );
    }
    componentDidMount = async () => {
        console.log("componentDidMount");
        await this.asyncGenerateChart();
        if(this.chart !== undefined) this.asyncReloadProps();
    }
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        console.log("componentDidUpdate");
        if(prevProps.bind !== this.props.bind){
            console.log("bind update");
            await this.asyncGenerateChart();
        }else{
            if(this.chart !== undefined) await this.asyncReloadProps();
        }
    }
    componentWillUnmount = async () => {
        console.log("componentWillUnount");
        if(this.chart !== undefined) this.chart = await this.chart.destroy();
    }
    render(){
        console.log("render");
        return(
            <Segment size="massive">
                <Dimmer active={this.props.loading}>
                    <Loader indeterminate>Preparing Data</Loader>
                </Dimmer>
                <div ref={node => (this.node = node)}/>
            </Segment>
        ); 
    }
}
 





// config: {
//     point:    { show: this.props.points },
//     subchart: { show: this.props.subchart },
//     tooltip:  { grouped: true },
//     legend:   { 
//         show: false,
//         position: 'right'
//     },
//     grid:{
//         x: { show: true },
//         y: { show: true }
//     },
//     zoom:{
//         enabled: true,
//         type: "scroll"
//     },
//     axis:{
//         x: {
//             show: false,
//             tick: {
//                 fit: false,
//                 rotate: 90
//             }
//         }
//     }
// }
// }
// }