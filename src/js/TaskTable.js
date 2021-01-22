import '../css/TaskTable.css';
import Button from './Button.js';
import moment from 'moment';
import React, { Component } from 'react';
import axios from 'axios';

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

export default class TaskTable extends Component {
    state = {'tasks': []};
    componentDidMount() {
        // axios.get(`http://localhost:8080/tasks`)
        //      .then(res => this.setState({'tasks': res.data}));
        this.setState({'tasks': tasks});
    };

    deleteHandler = (taskId) => {
        let tasks = this.state.tasks.filter( task => task.id !== taskId);
        this.setState({'tasks': tasks});
    };

    updateHandler = () => console.log("update");

    markAsDoneHandler = (taskId) => {
        let temp = this.state.tasks;
        for(let i=0; i<temp.length; i++) {
            if(temp[i].id === taskId) {
                temp[i].status = "Done";
            }
        }
        this.setState({'tasks': temp});
    }

    render() {
        return (
            <div>
                <table className="TaskTable">
                    <thead className="HeadRow">
                        <tr>
                            <th className="Value TitleColumn"> Title </th>
                            <th className="Value DescriptionColumn"> Description </th>
                            <th className="Value OtherColumns"> Added On </th>
                            <th className="Value OtherColumns"> Due By </th>
                            <th className="Value OtherColumns"> Status </th>
                            <th className="Value OtherColumns" colSpan={3}> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tasks.map(task =>
                            <TaskRow key={task.id}
                               updateHandler={this.updateHandler}
                               deleteHandler={this.deleteHandler}
                               markAsDoneHandler={this.markAsDoneHandler}
                               {...task} />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

function TaskRow(props) {
    const added_on = moment.unix(props.added_on / 1000).format('dddd, MMMM Do, YYYY h:mm A');
    const due_by = moment.unix(props.due_by / 1000).format('dddd, MMMM Do, YYYY h:mm A');
    const doneVisibility = (props.status === "TODO");
    const editVisibility = (props.status === "TODO");

    return (
        <tr className="DataRow">
            <td className="Value TitleColumn"> {props.title} </td>
            <td className="Value DescriptionColumn"> {props.description} </td>
            <td className="Value OtherColumns"> {added_on} </td>
            <td className="Value OtherColumns"> {due_by} </td>
            <td className="Value OtherColumns"> {props.status} </td>
            <td className="Value OtherColumns">
                <Button id="Update"
                    action={props.updateHandler}
                    visibility={editVisibility}
                    taskId={props.id} />
            </td>
            <td className="Value OtherColumns">
                <Button id="Remove"
                    action={props.deleteHandler}
                    taskId={props.id} />
            </td>
            <td className="Value OtherColumns">
                <Button id="Done"
                    action={props.markAsDoneHandler}
                    visibility={doneVisibility}
                    taskId={props.id} />
            </td>
        </tr>
    );
}
