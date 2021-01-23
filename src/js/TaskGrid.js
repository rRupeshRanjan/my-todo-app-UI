import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';

import '../css/TaskGrid.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const tasks = [
  {
    "id": 1,
    "title": "Add action column with update and delete buttons",
    "description": "Add action column with update and delete buttons",
    "added_on": 1610862610385,
    "due_by": 1610963610385,
    "status": "Done"
  },
  {
    "id": 2,
    "title": "Remove description from columns",
    "description": "Remove description from columns",
    "added_on": 1610862610385,
    "due_by": 1610963610385,
    "status": "TODO"
  },
  {
    "id": 3,
    "title": "Make title clickable, and pop up all details on click",
    "description": "Make title clickable, and pop up all details on click",
    "added_on": 1610862610385,
    "due_by": 1610963610385,
    "status": "TODO"
  },
  {
    "id": 4,
    "title": "Make buttons actionable",
    "description": "make delete button actionable",
    "added_on": 1610862610385,
    "due_by": 1610963610385,
    "status": "Done"
  },
  {
    "id": 5,
    "title": "Make buttons actionable",
    "description": "make update button actionable",
    "added_on": 1610862610385,
    "due_by": 1610963610385,
    "status": "Done"
  },
  {
    "id": 6,
    "title": "delete button in action",
    "description": "should delete row with delete button",
    "added_on": 1610862610385,
    "due_by": 1610963610385,
    "status": "Done"
  },
  {
      "id": 7,
      "title": "Add action column with update and delete buttons",
      "description": "Add action column with update and delete buttons",
      "added_on": 1610862610385,
      "due_by": 1610963610385,
      "status": "Done"
    },
    {
      "id": 8,
      "title": "Remove description from columns",
      "description": "Remove description from columns",
      "added_on": 1610862610385,
      "due_by": 1610963610385,
      "status": "TODO"
    },
    {
      "id": 9,
      "title": "Make title clickable, and pop up all details on click",
      "description": "Make title clickable, and pop up all details on click",
      "added_on": 1610862610385,
      "due_by": 1610963610385,
      "status": "TODO"
    },
    {
      "id": 10,
      "title": "Make buttons actionable",
      "description": "make delete button actionable",
      "added_on": 1610862610385,
      "due_by": 1610963610385,
      "status": "Done"
    },
    {
      "id": 11,
      "title": "Make buttons actionable",
      "description": "make update button actionable",
      "added_on": 1610862610385,
      "due_by": 1610963610385,
      "status": "Done"
    },
    {
      "id": 12,
      "title": "delete button in action",
      "description": "should delete row with delete button",
      "added_on": 1610862610385,
      "due_by": 1610963610385,
      "status": "Done"
    }
];

export default class TaskGrid extends Component {
    state = {};
    dateRenderer = (data) => { return moment(data.value).format('MM/DD/YYYY HH:mm') };

    onGridReady = (params) => {
        this.gridApi = params.gridApi;
        this.gridColumnApi = params.gridColumnApi;
    };

    componentDidMount() {
        this.setState({
            tasks: tasks,
            gridApi: null,
            gridColumnApi: null,
            defaultColDef: {
                flex: 1,
                resizable: true
            },
            columnDefs: [
                {
                    headerName: 'Title',
                    field: 'title',
                    colId: 'title'
                },
                {
                    headerName: 'Description',
                    field: 'description',
                    colId: 'description',
                    editable: true
                },
                {
                    headerName: 'Added on',
                    field: 'added_on',
                    colId: 'added_on',
                    cellRenderer: this.dateRenderer,
                    sortable: true,
                },
                {
                    headerName: 'Due by',
                    field: 'due_by',
                    colId: 'due_by',
                    cellRenderer: this.dateRenderer,
                    sortable: true,
                },
                {
                    headerName: 'Status',
                    field: 'status',
                    colId: 'status',
                    sortable: true,
                    filter: true,
                }
            ]
        });
    }

    render() {
        return (
            <div className="ag-theme-alpine">
                <AgGridReact
                    domLayout='autoHeight'
                    onGridReady = {this.onGridReady}
                    rowSelection = 'multiple'
                    rowData = {this.state.tasks}
                    columnDefs = {this.state.columnDefs}
                    defaultColDef={this.state.defaultColDef}>
                </AgGridReact>
            </div>
        )
    };
};
