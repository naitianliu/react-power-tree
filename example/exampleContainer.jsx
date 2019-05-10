import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Navigation from './components/navigation';

const styles = {
    root: {

    }
};

class ExampleContainer extends React.Component {
    state = {

    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Navigation/>
            </div>
        )
    }
}

ExampleContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExampleContainer);
