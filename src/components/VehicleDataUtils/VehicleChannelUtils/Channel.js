import {Menu} from "semantic-ui-react";
import React from "react";
import '../../../assets/css/SidebarItem.css';

export class Channel extends Menu.Item {
    constructor(props) {
        super(props);
        this.states = {
            value: props.value,
            text: props.text,
            clicked: null
        }
    }

    render() {
        return (
            <Menu.Item className={'sidebar-item'} onClick={() => {
                this.props.onClick(this.states.text);
            }} active={this.props.active}>
                <div className='sidebar-item-alignment-container'>
                    {this.states.text}
                </div>
            </Menu.Item>
        )
    }
}