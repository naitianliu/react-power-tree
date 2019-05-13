# react-power-tree

![npm version](https://img.shields.io/npm/v/react-power-tree/latest.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com)

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

### Static data-driven tree view

#### [Examples](https://naitianliu.github.io/react-power-tree/)

```jsx harmony
<PowerTree
    data={dataDefaultExpanded}
    onNodeSelect={(nodeData) => {
        console.log('Node selected', nodeData);
    }}
/>
```

### Attributes of node

| Key | Type | Required |  Detail |
|:---|:---|:---:|:---|
| name | `string` | Y | The name of child nodes with same parent node must be different from each other |
| children | `array` | N | Array of child node data |
| defaultExpanded | `boolean` | N | Default value is `false` |


