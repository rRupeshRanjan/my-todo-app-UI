import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import axios from 'axios';
import ButtonCellRenderer from './renderer/ButtonCellRenderer.js';

import '../css/TaskGrid.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// TODO: Remove this. Keeping just for testing
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
  }
];

export default class TaskGrid extends Component {
    state = {}

    dateRenderer = (data) => { return moment(data.value).format('MM/DD/YYYY HH:mm') }

    markAsDoneHandler = (taskId) => {
        // TODO: Make api-call
        let tasksCopy = this.state.tasks.slice();
        for(let i=0; i<tasksCopy.length; i++) {
            if(tasksCopy[i].id === taskId) {
                tasksCopy[i].status = "Done";
            }
        }
        this.setState({ tasks : tasksCopy });
        this.gridApi.redrawRows();
    }

    deleteHandler = (taskId) => {
        axios.delete(`http://localhost:8080/task/${taskId}`);
        axios.get(`http://localhost:8080/tasks`)
             .then(res => this.setState({ tasks: res.data}));
    }

    editHandler = (taskId) => {
        // TODO: Implement this
        console.log("please implement me first, huh!!")
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    constructor(props) {
        super(props);
        this.state = {
            frameworkComponents: {
                ButtonCellRenderer: ButtonCellRenderer,
            },
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
                },
                {
                    headerName: 'Actions',
                    cellRenderer: 'ButtonCellRenderer',
                    cellRendererParams: {
                        message: 'Hello world',
                        deleteAction: this.deleteHandler,
                        markDoneAction: this.markAsDoneHandler,
                        editAction: this.editHandler,
                    },
                },
            ],
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/tasks`)
             .then(res => this.setState({ tasks: res.data}));
    }

    render() {
        return (
            <div className='ag-theme-alpine'>
                <AgGridReact
                    domLayout='autoHeight'
                    rowSelection = 'multiple'
                    rowData = {this.state.tasks}
                    columnDefs = {this.state.columnDefs}
                    defaultColDef={this.state.defaultColDef}
                    immutableData={false}
                    frameworkComponents={this.state.frameworkComponents}
                    onGridReady = {this.onGridReady}
                />
            </div>
        )
    };
};
