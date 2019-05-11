import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {dataRecursive, dataAppended} from "example/data/recursiveData";
import PowerTree from 'src/powerTree';
import Typography from "@material-ui/core/Typography";

export default function RecursiveTreeView(props) {
    return (
        <div>
            <Typography variant={"h6"}>Recursive</Typography>
            <PowerTree
                data={dataRecursive}
                onNodeSelect={(nodeData) => {
                    console.log('Node selected', nodeData);
                }}
                onNodeExpand={(nodeData, operations) => {
                    const {addChildren} = operations;
                    addChildren(dataAppended);
                }}
            />
            <br/>
        </div>
    )
}