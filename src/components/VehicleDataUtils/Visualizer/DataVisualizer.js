import {Icon, Header, Menu} from 'semantic-ui-react';
import React from 'react';
import GetTests from "../VehicleTestUtils/getTests";
import GetRuns from "../VehicleRunUtils/getRuns";
import GetChannels from "../VehicleChannelUtils/getChannels";
import '../../../assets/css/Sidebar.css';
import DataGrid from "../DataGrid/DataGrid";
import PropTypes from 'prop-types';

export default class DataVisualizer extends Menu {
    static propTypes = {
        title: PropTypes.string,
        icon: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            pageTitle: props.title,
            pageIcon: props.icon,
            selectedTest: null,
            selectedRun: null,
            selectedChannels: []
        }

        this.handleTestSelection = this.handleTestSelection.bind(this)
    }

    handleTestSelection(test) {
        this.setState({selectedTest: test});
    }

    handleRunSelection(run) {
        this.setState({selectedRun: run});
    }

    handleChannelSelection(channel) {
        let array = [...this.state.selectedChannels];
        if (array.includes(channel)) {
            const index = array.indexOf(channel);
            array.splice(index, 1);
            this.setState({selectedChannels: array});
        } else {
            this.setState({selectedChannels: [...this.state.selectedChannels, channel]});
        }
    }

    render() {
        return (
            <div>
                <Header as="h1" style={{marginLeft: 17 + "em"}}>
                    <Icon name={this.state.pageIcon}/>
                    {this.state.pageTitle}
                </Header>
                <Menu borderless vertical stackable fixed='left' className='side-nav'>
                    <Menu.Item>
                        <h2>
                            Tests
                        </h2>
                    </Menu.Item>

                    <GetTests callWhenClick={(e) => this.handleTestSelection(e)}
                              selectedTest={this.state.selectedTest}/>

                    <Menu.Item>
                        <h2>
                            Runs
                        </h2>
                    </Menu.Item>

                    <GetRuns test={this.state.selectedTest} callWhenClick={(e) => this.handleRunSelection(e)}
                             selectedRun={this.state.selectedRun}/>

                    <Menu.Item>
                        <h2>
                            Channels
                        </h2>
                    </Menu.Item>

                    <GetChannels callWhenClick={(e) => this.handleChannelSelection(e)}
                                 selectedChannels={this.state.selectedChannels}/>
                </Menu>

                <DataGrid test={this.state.selectedTest} run={this.state.selectedRun} channels={this.state.selectedChannels}/>
            </div>
        );
    }
}