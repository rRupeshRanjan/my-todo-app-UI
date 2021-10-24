import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import utility from '../renderer/Utility'
import ButtonCellRenderer from '../renderer/ButtonCellRenderer';

import '../../css/home.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default class TaskGrid extends Component {
    state = {}

    markAsDoneHandler = (task) => {
        task.status = "Done";
        axios.put(`http://localhost:8080/task/${task.id}`, task)
             .then(() => this.gridApi.redrawRows());
    }

    deleteHandler = (taskId) => {
        axios.delete(`http://localhost:8080/task/${taskId}`)
            .then(res => {
                if (res.status === 204) {
                    axios.get(`http://localhost:8080/tasks?page=-1`)
                         .then(res => this.setState({ tasks: res.data}));
                }
            });
    }

    editHandler = (taskId) => {
        this.props.history.push(`/task/${taskId}`)
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        axios.get(`http://localhost:8080/tasks?page=-1`)
             .then(res => this.setState({ tasks: res.data}));
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
                    colId: 'title',
                    filter: true,
                },
                {
                    headerName: 'Description',
                    field: 'description',
                    colId: 'description',
                    editable: true,
                    filter: true,
                },
                {
                    headerName: 'Added on',
                    field: 'added_on',
                    colId: 'added_on',
                    cellRenderer: utility.DateRenderer,
                    sortable: true,
                },
                {
                    headerName: 'Due by',
                    field: 'due_by',
                    colId: 'due_by',
                    cellRenderer: utility.DateRenderer,
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
                        deleteAction: this.deleteHandler,
                        markDoneAction: this.markAsDoneHandler,
                        editAction: this.editHandler,
                    },
                },
            ],
            pagination: {
                enabled: true,
                size: 15,
            },
        };
    }

    render() {
        return (
            <div className='ag-theme-alpine'>
                <AgGridReact
                    domLayout='autoHeight'
                    rowSelection = 'multiple'
                    pagination = {this.state.pagination.enabled}
                    paginationPageSize = {this.state.pagination.size}
                    rowData = {this.state.tasks}
                    columnDefs = {this.state.columnDefs}
                    defaultColDef = {this.state.defaultColDef}
                    frameworkComponents={this.state.frameworkComponents}
                    onGridReady = {this.onGridReady}
                />
            </div>
        )
    };
};
