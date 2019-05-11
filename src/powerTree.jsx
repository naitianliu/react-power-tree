import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from "@material-ui/core/List"
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import FolderIcon from '@material-ui/icons/Folder'

const styles = theme => ({
    root: {

    },
    list: {
        backgroundColor: 'white',
        paddingLeft: 0,
        paddingRight: 0,
        marginBottom: 0,
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    listItem: {
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 10,
    },
    listItemActive: {
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 10,
        backgroundColor: '#c0c0c0',
    },
    listItemIcon: {
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
        width: 20,
    },
    listItemText: {
        marginLeft: 0,
    }
});

const statusOption = {
    loading: 'loading',
    expanded: 'expanded',
    failed: 'failed',
    collapsed: 'collapsed',
};

const getPathString = (nodeData) => {
    console.log('nodeData', nodeData);
    const {name, parents} = nodeData;
    let names = parents.map(node => node.name);
    return [...names, name].join(',');
};

function recurToGetTree(props, state, targetNode, depth = 0, onClickFunc, onSelectFunc) {
    const {classes} = props;
    const {pathStatusMap, currentPath} = state;
    const path = getPathString(targetNode);
    const status = pathStatusMap[path];
    const collapse = !status || status === statusOption.collapsed;
    return (
        <div>
            {!!targetNode.children && targetNode.children.length > 0 &&
            <Collapse in={depth === 0 || !collapse} unmountOnExit>
                <List className={classes.list}>
                    {targetNode.children.map((nodeData, i) => {
                        nodeData['parents'] = [...targetNode.parents, targetNode];
                        const path = getPathString(nodeData);
                        const {name, children} = nodeData;
                        const hasChildren = !!children && children.length > 0;
                        const status = pathStatusMap[path];
                        const collapse = !status || status === statusOption.collapsed;
                        let arrowIcon = !!collapse ? <ArrowRightIcon/> : <ArrowDropDownIcon/>;
                        if (!hasChildren) {
                            arrowIcon = <span/>;
                        }
                        const fileIcon = hasChildren ? <FolderIcon/> : <InsertDriveFileOutlinedIcon/>;
                        return (
                            <div key={path + i}>
                                <ListItem
                                    button
                                    selected={path === currentPath}
                                    style={{paddingLeft: 20 * depth}}
                                    className={path === currentPath ? classes.listItemActive : classes.listItem}
                                    onClick={() => {
                                        onSelectFunc(nodeData);
                                    }}
                                    onDoubleClick={() => {
                                        if (hasChildren) {
                                            onClickFunc(nodeData);
                                        }
                                    }}
                                >
                                    <ListItemIcon
                                        fontSize={"large"}
                                        className={classes.listItemIcon}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            if (hasChildren) {
                                                onClickFunc(nodeData);
                                            }
                                        }}
                                    >
                                        {arrowIcon}
                                    </ListItemIcon>
                                    <ListItemIcon className={classes.listItemIcon}>
                                        {fileIcon}
                                    </ListItemIcon>
                                    <ListItemText
                                        className={classes.listItemText}
                                        primary={<Typography variant={"subtitle1"}>{name}</Typography>}
                                    />
                                </ListItem>
                                {hasChildren && recurToGetTree(props, state, nodeData, depth + 1, onClickFunc, onSelectFunc)}
                            </div>
                        )
                    })}
                </List>
            </Collapse>
            }
        </div>
    )
}

class PowerTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pathStatusMap: {},
            currentPath: ''
        };
    }

    componentDidMount() {

    }

    toggleToExpandDir = (nodeSelected) => {
        let {pathStatusMap} = this.state;
        const pathSelected = getPathString(nodeSelected);
        const status = pathStatusMap[pathSelected];
        const collapse = !status || status === statusOption.collapsed;
        if (collapse) {
            pathStatusMap[pathSelected] = statusOption.expanded;
            this.setState({pathStatusMap});
        } else {
            pathStatusMap[pathSelected] = statusOption.collapsed;
            this.setState({pathStatusMap});
        }
    };

    fileOrFolderSelect = (contentData) => {
        const {onPathSelect} = this.props;
        const {path} = contentData;
        if (!!onPathSelect) {
            onPathSelect(contentData);
        }
        this.setState({currentPath: path});
    };

    render() {
        const {classes, data} = this.props;
        const rootNode = {
            name: 'root',
            parents: [],
            children: data,
        };
        const tree = recurToGetTree(this.props, this.state, rootNode, 0, this.toggleToExpandDir, this.fileOrFolderSelect);
        return (
            <div className={classes.root}>
                {tree}
            </div>
        )
    }
}

PowerTree.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PowerTree);
