import React, {Component, Suspense} from "react";
import "semantic-ui-css/semantic.min.css";
import { Placeholder, Card, Segment, Grid, Image } from "semantic-ui-react";
import Gorilla from "../assets/Gorilla.jpg";

// const Gorilla = React.lazy( () => import("../assets/Gorilla.jpg") );

export default class Homepage extends Component{
    
    Elements = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]

    FallbackSelectionItem(){
        return (
            <Grid.Column computer="4" mobile="16" tablet="8" widescreen="4" largeScreen="4" >
                <Segment>
                    <Placeholder>
                        
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
            </Grid.Column>
        )
    }
    SelectionItem = (
        <Grid.Column computer="4" mobile="16" tablet="8" widescreen="4" largeScreen="4" >
            <Segment>
                <Placeholder>
                    <Suspense fallback={<Placeholder.Image square/>}>
                        <Image src={Gorilla}/>
                    </Suspense>
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
        </Grid.Column>
    );

    render(){
        return(
            <Grid>
                {this.Elements.map(x => this.SelectionItem)}
            </Grid>
        );
    }
}
