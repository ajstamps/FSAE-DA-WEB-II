import React, { useState, useEffect, componentRef, Suspense, SuspenseList } from 'react';
import { Grid, Segment, Placeholder } from 'semantic-ui-react';
import Chart from 'react-c3-component';
import Conf from "../Config.json"
import 'c3/c3.css';
import { Card, Spinner, Pane } from 'evergreen-ui';
// import LazyGraph from "../components/Graph";

const LazyGraph = React.lazy(() => import('../components/StyledLineGraph'));


//DB test on next thursday
//Writing sql statements
//Short answers
//Cheat sheet allowed - Single sided - A4

//Assignment 2 is due today
//Talk to ASU
//Talk to AAA
//This is due at 2

//Dont worry about inheritance in OOP
//Short answer listing (compare two things, difference between a and b, what are the difference between available the different access modifiers in C# (internal, protected, etc))
//UML Stuff: class diagrams, use case diagrams. No sequence diagram but there may be questinons regarding it.

function SelectionItem(){
    return (
        <Segment>
            <Placeholder>
                <Placeholder.Image square/>
            </Placeholder>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                </Placeholder>
            </Card.Content>
        </Segment>
    )
}
export default function AerodynamicsPage(){
    const Bigarr = [...Array(100).keys(), ...Array(100).reverse().keys(),...Array(100).keys(), ...Array(100).reverse().keys()];
    const BigarrX = [...Array(400).keys()];
    const Columns1 = [
        ['x1', ...BigarrX],
        ['x2', ...BigarrX],
        ['RPM', ...Bigarr],
        ['Temp1', ...Bigarr],
    ];
    const Columns2 = [
        ['x1', ...BigarrX.slice(200, 400)],
        ['x2', ...BigarrX.slice(200, 400)],
        ['RPM', ...Bigarr.slice(200, 400)],
        ['Temp1', ...Bigarr.slice(200, 400)],
    ];
    const Columns3 = [
        ['x1', ...BigarrX.slice(250, 400)],
        ['x2', ...BigarrX.slice(250, 400)],
        ['RPM', ...Bigarr.slice(250, 400)],
        ['Temp1', ...Bigarr.slice(250, 400)],
    ];
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
    const ColumnNames = Columns1.map(x => x[0]);
    function CenteredSpinner(){
        return (
            <Segment>
                <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
                    <Spinner />
                </Pane>
            </Segment>
        );
    }
    return (
        <Grid stackable>
            <Grid.Row>
                <Grid.Column widescreen="16" largeScreen="16" computer="16" tablet="16" mobile="16">
                    <Suspense fallback={<CenteredSpinner/>}>
                        <LazyGraph data={Columns1} bind={Binding} bar/>
                    </Suspense>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column widescreen="16" largeScreen="16" computer="16" tablet="16" mobile="16">
                    <Suspense fallback={<CenteredSpinner/>}>
                        <LazyGraph data={Columns2} bind={Binding}/>
                    </Suspense>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column widescreen="16" largeScreen="16" computer="16" tablet="16" mobile="16">
                    <Suspense fallback={<CenteredSpinner/>}>
                        <LazyGraph data={Columns3} bind={Binding}/>
                    </Suspense>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column widescreen="16" largeScreen="16" computer="16" tablet="16" mobile="16">
                    <Suspense fallback={<CenteredSpinner/>}>
                        <LazyGraph data={Columns4} bind={Binding}/>
                    </Suspense>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
} 