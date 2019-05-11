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
    const {name, parents} = nodeData;
    let names = parents.map(node => node.name);
    return [...names, name].join(',');
};

const getCollapseByNode = (nodeData, status) => {
    let collapse = !status || status === statusOption.collapsed;
    if (!status && !!nodeData.defaultExpanded) {
        collapse = false;
    }
    return collapse
};

function recurToGetTree(props, state, targetNode, depth = 0, onExpandFunc, onSelectFunc) {
    const {classes} = props;
    const {pathStatusMap, currentPath} = state;
    const path = getPathString(targetNode);
    const status = pathStatusMap[path];
    const collapse = getCollapseByNode(targetNode, status);
    return (
        <div>
            {!!targetNode.children && targetNode.children.length > 0 &&
            <Collapse in={depth === 0 || !collapse} unmountOnExit>
                <List className={classes.list}>
                    {targetNode.children.map((nodeData, i) => {
                        nodeData['parents'] = [...targetNode.parents, targetNode];
                        const path = getPathString(nodeData);
                        const {name, children} = nodeData;
                        let hasChildren = !!children && children.length > 0;
                        console.log(hasChildren, nodeData);
                        const status = pathStatusMap[path];
                        const collapse = getCollapseByNode(nodeData, status);
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
                                        onExpandFunc(nodeData);
                                    }}
                                >
                                    <ListItemIcon
                                        fontSize={"large"}
                                        className={classes.listItemIcon}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onExpandFunc(nodeData);
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
                                {hasChildren && recurToGetTree(props, state, nodeData, depth + 1, onExpandFunc, onSelectFunc)}
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

    toggleToExpandNode = (nodeData) => {
        let {pathStatusMap} = this.state;
        const pathSelected = getPathString(nodeData);
        const status = pathStatusMap[pathSelected];
        const collapse = getCollapseByNode(nodeData, status);
        if (collapse) {
            pathStatusMap[pathSelected] = statusOption.expanded;
            this.setState({pathStatusMap});
        } else {
            pathStatusMap[pathSelected] = statusOption.collapsed;
            this.setState({pathStatusMap});
        }
    };

    handleNodeSelect = (nodeData) => {
        const {onNodeSelect} = this.props;
        if (!!onNodeSelect) {
            onNodeSelect(nodeData);
        }
        const path = getPathString(nodeData);
        this.setState({currentPath: path});
    };

    handleNodeExpand = (nodeData, params) => {
        const {onNodeExpand} = this.props;
        const hasChildren = !!nodeData.children && nodeData.children.length > 0;
        if (hasChildren) {
            this.toggleToExpandNode(nodeData)
        } else {
            if (!!onNodeExpand) {
                onNodeExpand(nodeData, {
                    addChildren: (children) => {
                        nodeData['children'] = children;
                        // params.nodeUpdated(nodeData);
                        this.toggleToExpandNode(nodeData)
                    }
                });
            }
        }
    };

    render() {
        const {classes, data} = this.props;
        const rootNode = {
            name: 'root',
            parents: [],
            children: data,
        };
        const tree = recurToGetTree(this.props, this.state, rootNode, 0, this.handleNodeExpand, this.handleNodeSelect);
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
