import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {dataBasic} from "example/data/staticData";
import PowerTree from 'src/powerTree';

export default function StaticTreeView(props) {

    return (
        <div>
            <PowerTree data={dataBasic}/>
        </div>
    )
}