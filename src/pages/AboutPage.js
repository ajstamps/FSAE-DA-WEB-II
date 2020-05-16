import React from 'react';
import CarImg from "../assets/b.jpg";
import { Icon, Container, Header, Image, Card, Divider, Grid } from 'semantic-ui-react';

export default function AboutPage(){
    const items = [
        {
            header: "Aerodynamics",
            description: "Force air up, car stays down.",
            meta: "",
            icon: "plane"
        },
        {
            header: "Electrical",
            description: "The best electrical system, is one that you don't even realize is working.",
            meta: "",
            icon: "lightning"
        },
        {
            header: "Engine",
            description: "Nothing moves without our say. And generally we don't have a say in it.",
            meta: "",
            icon: "tachometer alternate" 
        },
        {
            header: "Frame",
            description: "Stiffness is key, it is the fifth spring after all.",
            meta: "",
            icon: "truck" 
        },
        {
            header: "Suspension",
            description: "Keeping the tires to the road... mostly.",
            meta: "",
            icon: "car"
        },
        {
            header: "Controls",
            description: "What good is a fast car if you can't control it?",
            meta: "",
            icon: "cogs" 
        }
    ];
    const GenerateCard = (header, description, icon, meta) => (
        <Card>
            <Card.Content header={header} />
            <Card.Content description={description} />
            <Card.Content extra>
                <Icon name={icon}/> {meta}
            </Card.Content>
        </Card>
    );
    return (
        <Container>
            {/* <Segment raised padded> */}
            <Header size="huge" textAlign="left">Formula Society of Automotive Engineering</Header>
            <Divider/>
            <Grid stackable celled="internally">
                <Grid.Row>
                    <Grid.Column width="4" verticalAlign="middle">
                        <Image size="huge" bordered centered rounded src={CarImg}/>
                    </Grid.Column>
                    <Grid.Column width="12">
                        <Header size="huge" textAlign="left">About Us</Header>
                        We are the Formula SAE team located at South Dakota State University known as Wild Hare Racing. 
                        We are a team of students that creates a quarter-scale Formula 1 style car to compete in the international competition known as Formula SAE.<br/><br/>
                        Each subteam is dedicated to achieving the maximum performance from their system. The team is lead by two individuals, the Team Principal and the Design Lead.
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider/>
            <Header size="huge" textAlign="centered">Subteams</Header>
            <Card.Group centered>
                {items.map(x => GenerateCard(x.header, x.description, x.icon, x.meta))}
            </Card.Group>
            {/* </Segment> */}
        </Container>
    );
} 