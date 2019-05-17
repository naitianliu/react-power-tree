import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {dataBasic, dataDefaultExpanded} from "example/data/staticData";
import PowerTree from 'src/powerTree';
import Typography from "@material-ui/core/Typography";

export default function StaticTreeView(props) {

    return (
        <div>
            <Typography variant={"h6"}>Basic</Typography>
            <PowerTree data={dataBasic}/>
            <br/>
            <Typography variant={"h6"}>Default Expanded</Typography>
            <PowerTree data={dataDefaultExpanded}/>
            <br/>
            <Typography variant={"h6"}>Event: Node Selected</Typography>
            <PowerTree
                data={dataDefaultExpanded}
                onNodeSelect={(nodeData) => {
                    console.log('Node selected', nodeData);
                }}
            />
            <br/>
        </div>
    )
}
