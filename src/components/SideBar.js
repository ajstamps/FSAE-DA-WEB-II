import React from 'react';
import { Button, Icon, Header, Dropdown, Menu, Grid, Sidebar, Segment } from 'semantic-ui-react';
import '../pages/shared.css';
import TestPicker from './TestPicker';

export class SideBar extends React.Component {


  render() {
    return (
      <Menu borderless vertical stackable fixed='left' className='side-nav'>
        <TestPicker/>
      </Menu>
    );
  }
}