import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Segment, Loader, Dimmer } from 'semantic-ui-react';
import C3 from 'c3';
import 'c3/c3.css';

export default class StyledLineGraph extends Component{
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.array).isRequired,
        bind: (PropTypes.string).isRequired,
        subchart: PropTypes.bool,
        point: PropTypes.bool,
        loading: PropTypes.bool,
        title: PropTypes.string,
        color: PropTypes.string,
        update: PropTypes.bool
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
                },
                label: "time"
            }
        },
        title: {
            text: this.props.title
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
                x: "time",
                colors: {
                    [this.props.bind]: this.props.color
                }
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
            unload: true,
            colors: {
                [this.props.bind]: this.props.color
            }
        } );
    }
    componentDidMount = async () => {
        await this.asyncGenerateChart();
        if(this.chart !== undefined) this.asyncReloadProps();
    }
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if(prevProps.bind !== this.props.bind)
            await this.asyncGenerateChart();
        else
            if(this.chart !== undefined)
                await this.asyncReloadProps();
    }

    render(){
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