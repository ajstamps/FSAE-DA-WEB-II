import React from "react";
import  RGL, {WidthProvider} from "react-grid-layout";
import DataLoader from "../VehicleDataUtils/DataLoader";
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

export default class LocalStorageLayout extends React.PureComponent {
    static defaultProps = {
        className: "defaultLayout",
    };

    render() {
        if (this.props.channel===null){
            return <div/>;
        }
        return (
            <div>
                <ReactGridLayout
                    {...this.props}
                    containerPadding={[272, 0]}
                    preventCollision={true}
                    width={120}
                    margin={[10, 40]}
                >
                    {this.props.channels.map((channel) => {
                            return (
                                    <div key={channel} data-grid={{x: 1, y: 0, w: 5, h: 2, minW: 5, maxW: 20, minH: 1, maxH: 5}}>
                                        <DataLoader test={this.props.test} run={this.props.run} channel={channel}/>
                                    </div>)})}
                </ReactGridLayout>
            </div>
        );
    }
}
