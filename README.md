# react-power-tree

## Usage

### Static data-driven tree view

```javascript
const data = [
    {
        name: "Downloads",
        defaultExpand: false,
        children: [
            
        ],
        icon: '',
        
        
    },
    {
        name: "Documents"
    },
    {
        name: "Desktop"
    }
];

```

```jsx harmony
<PowerTree
    data={data}
    loadingComponent={<Spinner/>}
    onNodeClick={(nodeData, callback) => {
        const {setLoading, setChildrenNodes} = callback;
        console.log(nodeData);
        setLoading();
        addChildren(childrenData);
    }}
/>
```