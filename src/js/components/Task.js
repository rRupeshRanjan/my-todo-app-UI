import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import utility from '../renderer/Utility';
import { Button } from '@material-ui/core';

export default class Task extends Component {
    state = {}

    componentDidMount() {
        axios.get(`http://localhost:8080/task/${this.props.match.params.id}`)
            .then(res =>
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    added_on: res.data.added_on,
                    due_by: res.data.due_by,
                    status: res.data.status
                })
            );
    }

    updateTask = () => {
        console.log("please implement me")
    };

    setTitle       = event => this.setState({ title: event.target.value });
    setDescription = event => this.setState({ description: event.target.value });
    setAddedOn     = event => this.setState({ added_on: utility.ConvertDateToEpoch(event.target.value) });
    setDueBy       = event => this.setState({ due_by: utility.ConvertDateToEpoch(event.target.value) });

    render() {
        return (
          <div style={{ padding: '10px' }}>
            <Button
                title='status'
                variant='contained'
                disabled
                style={{ color: 'green', fontWeight: 'bold', fontSize: '20px', float: 'left'}}
            >
                {this.state.status}
            </Button>
            <Button
                title='Save'
                variant='contained'
                color='secondary'
                onClick={ () => {this.updateTask()} }
                style={{ float: 'right' }}
            >
                Save
            </Button>
            <form>
              <TextField
                fullWidth={true}
                margin="normal"
                label="Title"
                required
                onChange={this.setTitle}
                defaultValue = {this.state.title}
              />
              <TextField
                fullWidth={true}
                multiline
                rows={4}
                margin="normal"
                label="Description"
                onChange={this.setDescription}
                defaultValue = {this.state.description}
              />
            </form>
            <div style={{ width: '50%' }}>
              <TextField
                style={{ float: 'left' }}
                label="Added On"
                margin="normal"
                type="datetime-local"
                variant="outlined"
                onChange={this.setAddedOn}
                defaultValue={ utility.EpochToFormattedDateString(this.state.added_on, "yyyy-MM-DDTHH:mm") }
              />
              <TextField
                style={{ float: 'right' }}
                label="Due By"
                margin="normal"
                type="datetime-local"
                variant="outlined"
                onChange={this.setDueBy}
                defaultValue={ utility.EpochToFormattedDateString(this.state.due_by, "yyyy-MM-DDTHH:mm") }
              />
            </div>
          </div>
        );
    }
}
