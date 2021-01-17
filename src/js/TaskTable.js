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

  render() {
  return (
    <div>
      <table className="TaskTable">
        <tbody>
          <tr className="HeadRow"> 
            <td className="Value TitleColumn"> Title </td>
            <td className="Value DescriptionColumn"> Description </td>
            <td className="Value OtherColumns"> Added On </td>
            <td className="Value OtherColumns"> Due By </td>
            <td className="Value OtherColumns"> Status </td>
            <td className="Value OtherColumns" colSpan={2}> Actions </td>
          </tr>
            {this.state.tasks.map(task => 
              <TaskRow key={task.id}
                       updateHandler={this.updateHandler} 
                       deleteHandler={this.deleteHandler}
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
  
  return (
    <tr className="DataRow"> 
      <td className="Value TitleColumn"> {props.title} </td>
      <td className="Value DescriptionColumn"> {props.description} </td>
      <td className="Value OtherColumns"> {added_on} </td>
      <td className="Value OtherColumns"> {due_by} </td>
      <td className="Value OtherColumns"> {props.status} </td>
      <td className="Value OtherColumns"> 
        <Button text="update" action={props.updateHandler} taskId={props.id}/> 
      </td>
      <td className="Value OtherColumns">
        <Button text="delete" action={props.deleteHandler} taskId={props.id}/> 
      </td>
    </tr>
  );
}