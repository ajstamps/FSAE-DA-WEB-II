import React from 'react';
import DataVisualizer from '../components/VehicleDataUtils/Visualizer/DataVisualizer';

export default function ViewerPage(){
    return (
        <div>
            <DataVisualizer title={"General Viewer"} icon={"eye"}/>
        </div>
    );
}