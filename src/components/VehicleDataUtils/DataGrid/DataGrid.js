import React from "react";
import  RGL, {WidthProvider} from "react-grid-layout";
import DataLoader from "../VehicleDataUtils/DataLoader";
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';
import PropTypes from 'prop-types';

const ReactGridLayout = WidthProvider(RGL);

export default class DataGrid extends React.PureComponent {
    static propTypes = {
        classname: PropTypes.string,
        channels: PropTypes.arrayOf(PropTypes.string),
        test: PropTypes.string,
        run: PropTypes.string
    }

    static defaultProps = {
        className: "defaultLayout",
    };

    render() {
        if (this.props.channels===null){
            return <div/>;
        }
        return (
            <div style={{paddingLeft:"272px"}}>
                <ReactGridLayout
                    {...this.props}
                    margin={[10, 101]}
                >
                    {this.props.channels.map((channel) => {
                            return (
                                    <div id={channel} key={channel}
                                         data-grid={
                                             {x: 0,
                                                 y: 0,
                                                 w: 4,
                                                 h: 2,
                                                 minW: 5,
                                                 maxW: 20,
                                                 minH: 1,
                                                 maxH: 5,
                                                 isResizable: false}}>
                                        <DataLoader test={this.props.test} run={this.props.run} channel={channel}/>
                                    </div>)})}
                </ReactGridLayout>
            </div>
        );
    }
}
