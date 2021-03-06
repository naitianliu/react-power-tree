// example - data - staticData.js
import React from 'react';
import CheckIcon from '@material-ui/icons/Check';

export const dataBasic = [
    {
        name: "Downloads",
        children: [
            {
                name: "dir10",
                icon: <CheckIcon/>,
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

export const dataDefaultExpanded = [
    {
        name: "Downloads",
        defaultExpanded: true,
        children: [
            {
                name: "dir10",
                defaultExpanded: true,
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