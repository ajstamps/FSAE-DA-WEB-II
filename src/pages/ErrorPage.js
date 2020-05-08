import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

export default function ErrorPage(){
    return(
        <Header as='h1' color="black">
            <Icon name="exclamation circle"/> Error: The requested page was not found.
        </Header> 
    );
} 