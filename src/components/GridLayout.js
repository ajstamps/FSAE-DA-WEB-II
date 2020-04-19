import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Rnd} from "react-rnd";

export default class GridLayout extends Component{
    static propTypes = {
        gridSize: PropTypes.number,
        size: PropTypes.arrayOf(

        ),
        position: PropTypes.arrayOf(
            
        ),
        onResizeStop: PropTypes.func
    }
    static defaultProps = {
        gridSize: 20,
        size: {
            width: 500,
            height: 200
        },
        position: {
            x: 0,
            y: 0
        }
    }
    state = {
        
    }
    settings = {
        ...this.props.size,
        ...this.props.position
    }
    grid = [this.props.gridSize,this.props.gridSize];
    render(){
        return( 
            <Rnd 
                ref={c => this.rnd = c}
                dragGrid={this.grid} 
                resizeGrid={this.grid}
                default={this.settings}
                bounds="parent"
                onResizeStop={this.props.onResizeStop}
            >
                {this.props.children}
            </Rnd>
        );
    }
} 