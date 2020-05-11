import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Container, Card } from 'semantic-ui-react';
import { toaster } from "evergreen-ui";

const Fields = {
    HeaderText: "Login",
    SuccessMsg: "Login Succsessful!",
    BadLoginMsg: "Bad username or password!",
    UnkMsg: "An unexpected error has occurred.",
    MaxWidth: 450
};

function LoginForm(){ return (
    <Container>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: Fields.MaxWidth }}>
                <Segment>
                    <Header as='h1' color='red' textAlign='center'> {Fields.HeaderText} </Header>
                </Segment>
                <Form size='large'>
                    <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                    />

                    <Button color='red' fluid size='large' onClick={SendButtonClick}>
                        Login
                    </Button>
                    </Segment>
                </Form>
                <Message>
                    New User? <a href='#'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    </Container>
) }

function SendButtonClick(){
    const s = "";
    const d = 3;
    switch(s){
        case "badlogin": toaster.danger(Fields.BadLoginMsg, {duration: d, id: "badlogin"}); break;
        case "success":  toaster.success(Fields.SuccessMsg, {duration: d, id: "success"});  break;
        default:         toaster.danger(Fields.UnkMsg,      {duration: d, id: "unk"});      break;
    }
}

export default LoginForm