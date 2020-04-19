import React, {Component} from 'react';
import GridLayout from "../components/GridLayout"
import StyledLineGraph from '../components/StyledLineGraph';

const Columns4 = [
    ['x1', 41, 23, 36, 54, 57, 208],
    ['x2', 91, 64, 56, null, 38, 220],
    ['RPM', 30, 200, 10, 400, 150, 250],
    ['Temp1', 90, 97, 99, 110, 120]
];
const Binding = {
    RPM: 'x1',
    Temp1: 'x2'
};

export default class ControlsPage extends Component{
    static defaultProps = {

    }
    state = {

    }
    render(){
        return (
            <Grid>
                <StyledLineGraph data={Columns4} bind={Binding}/>
            </Grid>
        );
    }
} 