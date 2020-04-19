import React, { Component, Suspense } from 'react';
import { withRouter } from "react-router-dom"
import { PropTypes } from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import C3 from 'c3';
import AppConfig from "../Config.json"
import 'c3/c3.css';
import { Spinner } from 'evergreen-ui';

export default class StyledLineGraph extends Component{
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.array).isRequired,
        bind: PropTypes.objectOf(PropTypes.array).isRequired,
        showAverage: PropTypes.bool,
        jsonUrl: PropTypes.string
    }
    static defaultProps = {
        data: [],
        bind: [],
        showAverage: false,
        subchart: false,
        jsonUrl: null
    }
    state = {   
        displayData: [],
        errState: "Ready"
    }
    async fetchDataFromJson(callback){
        const response = await fetch(AppConfig.datapath);
        const json = await response.json();

        callback(null, json)
            .catch(error => callback(error, null));
    }
    config = {
        point:    { show: false },
        subchart: { show: this.props.subchart },
        tooltip:  { grouped: true },
        legend:   { 
            show: false,
            position: 'right'
        },
        grid:{
            x: { show: true },
            y: { show: true }
        },
        data:{
            columns: this.props.data,
            xs:      this.props.bind
        },
        zoom: {
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
    componentDidMount() {
        // this.fetchDataFromJson( (err, json) => {
        //     if(json !== null) this.state.displayData = json;
        //     else this.state.errState = "Bad Fetch";
        // });
        this.generateChart();
    }
    componentDidUpdate() {
        // this.generateChart();
        //if(this.props.bar) this.chart.transform('area', 'RPM');
    }
    componentWillUnmount() {
        this.chart = this.chart.destroy();
    }
    generateChart() {
        this.chart = C3.generate({
            bindto: this.node,
            ...this.config,
        });
    }

    output = (
        <Segment>
            <div ref={node => (this.node = node)}/>
        </Segment>
    );
    errOutput = (
        <Segment>
            <div ref={node => (this.node = node)}/>
        </Segment> 
    );
    render(){
        const { config, errState } = this.props;
        return this.output;
        // switch( errState ){
        //     case "Ready": return this.output;
        //     case "Bad Fetch": return this.errOutput;
        // } 
    }
}
 