import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Navigation from './components/navigation';
import Typography from "@material-ui/core/Typography";
import {myTheme} from "example/constants";

const styles = theme => ({
    root: {}
});

const items = [
    {
        name: 'Static Tree View',
        content: <Typography>Static Tree View</Typography>
    },
    {
        name: 'Recursive Tree View',
        content: <Typography>Recursive Tree View</Typography>
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
