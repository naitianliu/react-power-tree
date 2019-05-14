import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {dataRecursive, dataAppended} from "example/data/recursiveData";
import PowerTree from 'src/../dist';
import Typography from "@material-ui/core/Typography";
import PowerTreeContainer from "src/powerTreeContainer";

const data2 = [
    {name: 'node-11'},
    {name: 'node-12'},
];

export default function RecursiveTreeView(props) {
    return (
        <div>
            <Typography variant={"h6"}>Dynamically add child nodes</Typography>
            <PowerTree
                data={dataRecursive}
                onNodeSelect={(nodeData) => {
                    console.log(nodeData)
                }}
                onNodeExpand={(nodeData, operations) => {
                    const {addChildren} = operations;
                    const data = [
                        {
                            name: `dir-${Math.floor(Math.random() * 1000)}`
                        },
                        {
                            name: `dir-${Math.floor(Math.random() * 1000)}`
                        },
                        {
                            name: `dir-${Math.floor(Math.random() * 1000)}`
                        },
                    ];
                    addChildren(data2);
                }}
            />
            <br/>
            <Typography variant={"h6"}>Power Tree Container</Typography>
            <PowerTreeContainer
                data={dataRecursive}
                onNodeSelect={(nodeData) => {
                    console.log(nodeData)
                }}
                onNodeExpand={(nodeData, operations) => {
                    const {addChildren} = operations;
                    addChildren(data2);
                }}
            />
        </div>
    )
}