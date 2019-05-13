import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Navigation from './components/navigation';
import StaticTreeView from './components/staticTreeView';
import RecursiveTreeView from './components/recursiveTreeView';

const styles = theme => ({
    root: {}
});

const items = [
    {
        name: 'Static Tree View',
        content: <StaticTreeView/>
    },
    {
        name: 'Recursive Tree View',
        content: <RecursiveTreeView/>
    },
];

class ExampleContainer extends React.Component {
    state = {};

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Navigation items={items}/>
            </div>
        )
    }
}

ExampleContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExampleContainer);
