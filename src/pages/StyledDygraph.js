// import React,{useState, useEffect, createRef, Component} from 'react';
// import StyledLineGraph from "../components/StyledLineGraph";
// import { Button, Segment, Dropdown, Dimmer, Loader } from 'semantic-ui-react';
// import { PropTypes } from 'prop-types';
// import Dygraph from "dygraphs";

// // import ChannelPicker from '../components/ChannelPicker';


// // export default function StyledDygraph( props = {title: "Undefined", ylabel: "Undefined"} ){

// //     const [columns, setColumns] = useState( [] );
// //     const [data, setData] = useState( [1,2,3] );
// //     const dygraphRef = createRef();

// //     useEffect( () => {
// //     }, [] );
    
// //     return (
// //         <Segment>
// //             <div ref={dygraphRef}/>
// //         </Segment>
// //     );
// // }

// export default class StyledDygraph extends Component{
//     static propTypes = {
//         title: PropTypes.string,
//         ylabel: PropTypes.string,
//         data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
//         bind: PropTypes.arrayOf(PropTypes.string),
//         loading: PropTypes.bool
//     }
//     static defaultProps = {
//         title: "",
//         ylabel: "",
//         data: undefined,
//         bind: undefined,
//         loading: false
//     }

//     constructor(props){
//         super(props);
//         this.state = {
//         };
//     }
//     generateGraph = () => {
//         if(this.graph) this.graph.destroy();
//         if(this.props.data){
//             this.graph = new Dygraph(this.node, this.props.data, {
//                 legend: "never",
//                 customBars: true,
//                 title: this.props.title,
//                 ylabel: this.props.ylabel,
//             });
//         }
//     }
//     componentDidMount = () => {
//         console.log(this.props.data);
//         this.generateGraph();
//     }
//     componentDidUpdate = (prevProps, prevState, snapshot) => {
//         console.log("componentDidUpdate");
//         if(this.props.data !== prevProps.data) this.generateGraph();
//     }
//     componentWillUnmount = () => {
//         console.log("componentWillUnount");
//         if(this.graph) this.graph.destroy();
//     }
//     render(){
//         console.log("render");
//         return (
//             <Segment size="big">
//                 <Dimmer active={this.props.loading}>
//                     <Loader indeterminate>Preparing Data</Loader>
//                 </Dimmer>
//                 <div ref={node => (this.node = node)}/>
//             </Segment>
//         );
//     }
// }