import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        marginTop: 50,
    },
    header: {
        width: '100%',
        height: 48,
        textAlign: 'center',
        verticalAlign: "center",
        paddingTop: 15,
    },

});

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        };
    }

    handleListItemClick = (index) => {
        this.setState({currentIndex: index});
    };
    
    render() {
        const {classes, items} = this.props;
        const {currentIndex} = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            {items[currentIndex].name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    <Drawer
                        variant={"permanent"}
                        open={true}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.header}>
                            <Typography variant={"h6"}>React Power Tree</Typography>
                        </div>
                        <Divider />
                        <List>
                            {items.map((item, i) => {
                                return (
                                    <ListItem key={i} button onClick={() => {this.handleListItemClick(i)}} selected={currentIndex === i}>
                                        <ListItemText primary={item.name}/>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Drawer>
                </nav>
                <main className={classes.content}>
                    {!!items[currentIndex] && items[currentIndex].content}
                </main>
            </div>
        )
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
};

export default withStyles(styles)(Navigation);
