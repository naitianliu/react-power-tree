import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
import Popover from "@material-ui/core/Popover";

const styles = theme => ({
    root: {},
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
        width: 30,
        minWidth: 20,
    },
    listItemText: {
        marginLeft: 0
    },
    itemText: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        fontWeight: 'bold',
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: -4,
        marginBottom: -4,
    },
    contextMenuListItem: {
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },
    contextMenuListItemIcon: {
        marginRight: 0,
        paddingRight: 0,
        width: 30,
        minWidth: 20,
    },
    contextMenuItemText: {

    },
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

const recurToGetTree = (props, state, targetNode, depth = 0, onExpandFunc, onSelectFunc, onRightClickFunc) => {
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
                    {targetNode.children.map((nodeData0, i) => {
                        let nodeData = Object.assign({}, nodeData0);
                        nodeData['parents'] = [...targetNode.parents, targetNode];
                        const path = getPathString(nodeData);
                        const {name, children} = nodeData;
                        let hasChildren = !!children && children.length > 0;
                        const status = pathStatusMap[path];
                        const collapse = getCollapseByNode(nodeData, status);
                        let arrowIcon = !!collapse ? <ArrowRightIcon/> : <ArrowDropDownIcon/>;
                        if (!hasChildren) {
                            arrowIcon = <span/>;
                        }
                        let nodeIcon;
                        if (!!nodeData.icon) {
                            nodeIcon = nodeData.icon;
                        } else {
                            nodeIcon = hasChildren ? <FolderIcon/> : <InsertDriveFileOutlinedIcon/>;
                        }
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
                                    onDoubleClick={(event) => {
                                        event.stopPropagation();
                                        onExpandFunc(nodeData);
                                    }}
                                    onContextMenu={event => {
                                        onRightClickFunc(event, nodeData);
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
                                        {nodeIcon}
                                    </ListItemIcon>
                                    <ListItemText
                                        className={classes.listItemText}
                                        primary={<Typography variant={"subtitle1"} className={classes.itemText}>{name}</Typography>}
                                    />
                                </ListItem>
                                {hasChildren && recurToGetTree(props, state, nodeData, depth + 1, onExpandFunc, onSelectFunc, onRightClickFunc)}
                            </div>
                        )
                    })}
                </List>
            </Collapse>
            }
        </div>
    )
};

class PowerTree extends React.Component {
    constructor(props) {
        super(props);
        const children = [...this.props.data];
        this.state = {
            pathStatusMap: {},
            currentPath: '',
            rootNode: {
                name: 'root',
                parents: [],
                children: children,
            },
            contextMenu: {
                open: false,
                clickX: 0,
                clickY: 0,
                nodeData: null
            }
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
            nodeData.parents.splice(0, 1);
            onNodeSelect(nodeData);
        }
        const path = getPathString(nodeData);
        this.setState({currentPath: path});
    };

    handleNodeExpand = (nodeData) => {
        const {onNodeExpand} = this.props;
        const hasChildren = !!nodeData.children && nodeData.children.length > 0;
        if (hasChildren) {
            this.toggleToExpandNode(nodeData)
        } else {
            if (!!onNodeExpand) {
                onNodeExpand(nodeData, {
                    addChildren: (children0) => {
                        const children = [...children0];
                        const hasChildren = !!nodeData.children && nodeData.children.length > 0;
                        if (!hasChildren) {
                            this.addChildrenToNode(nodeData, children);
                            this.toggleToExpandNode(nodeData);
                        }
                    }
                });
            }
        }
    };

    handleRightClick = (event, nodeData) => {
        event.preventDefault();
        event.persist();
        const {clientX, clientY} = event;
        nodeData.parents.splice(0, 1);
        this.setState({
            contextMenu: {
                open: true,
                clickX: clientX,
                clickY: clientY,
                nodeData,
            }
        })
    };

    handleContextMenuClose = () => {
        this.setState({
            contextMenu: {
                open: false,
                clickX: 0,
                clickY: 0,
                nodeData: null
            }
        });
    };

    addChildrenToNode = (nodeData, children) => {
        let {rootNode} = this.state;
        // get path array of node
        const {parents} = nodeData;
        let path = [];
        for (let i = 0; i < parents.length - 1; i++) {
            path = [...path, 'children', parents[i].children.findIndex(item => item.name === parents[i + 1].name)];
        }
        path = [...path, 'children', parents[parents.length - 1].children.findIndex(item => item.name === nodeData.name)];
        nodeData['children'] = children;
        nodeData = _.omit(nodeData, ['parents']);
        _.set(rootNode, path, nodeData);
        this.setState({rootNode});
    };

    render() {
        const {classes, options} = this.props;
        const {rootNode, contextMenu} = this.state;
        const tree = recurToGetTree(this.props, this.state, rootNode, 0, this.handleNodeExpand, this.handleNodeSelect, this.handleRightClick);
        return (
            <div className={classes.root}>
                {tree}
                {!!options && !!options.contextMenu &&
                <Popover
                    open={contextMenu.open}
                    anchorReference={"anchorPosition"}
                    anchorPosition={{
                        left: contextMenu.clickX,
                        top: contextMenu.clickY,
                    }}
                    onClose={this.handleContextMenuClose}
                >
                    <List dense={true}>
                        {options.contextMenu.items.map((item, i) => {
                            const {icon, label} = item;
                            return (
                                <ListItem
                                    key={i}
                                    button={true}
                                    className={classes.contextMenuListItem}
                                    onClick={() => {
                                        options.contextMenu.onSelect(label, contextMenu.nodeData);
                                        this.handleContextMenuClose();
                                    }}
                                >
                                    {!!icon &&
                                    <ListItemIcon className={classes.contextMenuListItemIcon}>{icon}</ListItemIcon>
                                    }
                                    <ListItemText
                                        disableTypography={true}
                                        primary={<Typography variant={"subtitle1"} className={classes.contextMenuItemText}>{label}</Typography>}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </Popover>
                }
            </div>
        )
    }
}

PowerTree.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PowerTree);
