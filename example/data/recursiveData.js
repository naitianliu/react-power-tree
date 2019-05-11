// example - data - staticData.js

export const dataRecursive = [
    {
        name: "Downloads",
        children: [
            {
                name: "dir10",
                children: [
                    {
                        name: "dir20"
                    },
                    {
                        name: "dir21"
                    },
                    {
                        name: "dir22"
                    },
                ],
            },
            {
                name: "dir11",
                children: [
                    {
                        name: "dir20"
                    },
                    {
                        name: "dir21"
                    },
                    {
                        name: "dir22"
                    },
                ],
            }
        ],
    },
    {
        name: "Documents"
    },
    {
        name: "Desktop"
    }
];

export const dataAppended = [
    {
        name: `dir-${Math.floor(Math.random() * 1000)}`
    },
    {
        name: `dir-${Math.floor(Math.random() * 1000)}`
    },
    {
        name: `dir-${Math.floor(Math.random() * 1000)}`
    },
];