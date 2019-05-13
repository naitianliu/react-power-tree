import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {dataRecursive, dataAppended} from "example/data/recursiveData";
import PowerTree from 'src/powerTree';
import Typography from "@material-ui/core/Typography";


const data3 = [
    {name: 'test-1'},
    {name: 'test-2'}
];

export default function RecursiveTreeView(props) {
    return (
        <div>
            <Typography variant={"h6"}>Recursive</Typography>
            <PowerTree
                data={dataRecursive}
                onNodeSelect={(nodeData) => {

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
                    const data2 = [
                        {name: 'test-1'},
                        {name: 'test-2'}
                    ];
                    const testData = [...data3];
                    addChildren(data3);
                }}
            />
            <br/>
        </div>
    )
}