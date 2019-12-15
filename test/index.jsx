import React from 'react';
import ReactDOM from 'react-dom';

import Component from '../dist/index.js';
import '../dist/index.less';
import 'antd/es/select/style';
import 'antd/es/table/style';
const data = [
  {
    id: '416384_0',
    name: '416384',
    canUnFold: true,
    property: {
      id: 416384,
      idType: 0,
    },
    children: [
      {
        id: '185715847_1',
        name: 'parent_node_001',
        canUnFold: true,
        childAmount: 9,
        property: {
          isExistFlag: false,
        },
      },
      {
        id: '185715847_2',
        name: 'parent_node_002',
        canUnFold: true,
        childAmount: 9,
        property: {
          isExistFlag: false,
        },
      },
      {
        id: '185715847_3',
        name: 'parent_node_011',
        canUnFold: true,
        childAmount: 9,
        property: {
          isExistFlag: false,
        },
      },
      {
        id: '185715847_4',
        name: 'parent_node_012',
        canUnFold: true,
        childAmount: 9,
        property: {
          isExistFlag: false,
        },
      },
      {
        id: '185715847_5',
        name: 'parent_node_013',
        canUnFold: true,
        childAmount: 9,
        property: {
          isExistFlag: false,
        },
      },
    ],
  },
];
ReactDOM.render(<Component dataSourceL={data} inline={false} />, document.getElementById('app'));
