# react-power-tree

![npm version](https://img.shields.io/npm/v/react-power-tree/latest.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com) ![stage](https://img.shields.io/badge/stage-alpha-red.svg) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

## Installation

```npm
npm install react-power-tree
```

Current version requires `react` and `material-ui` as dependencies. Please check `peerDependencies` in `package.json`. 

## Usage

```javascript
import PowerTree from 'react-power-tree';
```

Developers can choose to provide static data to render tree view or recursively add child nodes in dynamic way. 

### [Online Examples](https://naitianliu.github.io/react-power-tree/)

### Static tree view

```jsx harmony
<PowerTree
    data={data}
    onNodeSelect={(nodeData) => {
        console.log(nodeData);
    }}
/>
```

### Attributes of node

| Key | Type | Required |  Detail |
|:---|:---|:---:|:---|
| name | `string` | Y | The name of child nodes with same parent node must be different from each other |
| children | `array` | N | Array of child node data |
| defaultExpanded | `boolean` | N | Default value is `false` |

### Dynamic tree view

```jsx harmony
<PowerTree
    data={initData}
    onNodeSelect={(nodeData) => {
        console.log(nodeData)
    }}
    onNodeExpand={(nodeData, operations) => {
        const {addChildren} = operations;
        const childNodes = [...data];
        addChildren(childNodes);
    }}
/>
```