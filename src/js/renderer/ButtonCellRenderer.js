import React, { Component } from 'react';

import '../../css/Button.css';
import edit from '../../images/edit.png'
import remove from '../../images/remove.png'
import done from '../../images/done.png'

export default class ButtonCellRenderer extends Component {
    render() {
        return (
            <div>
                <button
                    title='edit'
                    onClick={ () => this.props.editAction(this.props.data.id) }
                    style={{ cursor: getCursorForAction(this.props.data.status) }}
                    disabled={isButtonDisabled(this.props.data.status)}>
                    <img src={getImageForButton('edit')} alt={'edit'} className="icon" />
                </button>
                <button
                    title='remove'
                    onClick={ () => this.props.deleteAction(this.props.data.id) }>
                    <img src={getImageForButton('remove')} alt={'remove'} className="icon" />
                </button>
                <button
                    title='done'
                    onClick={ () => this.props.markDoneAction(this.props.data) }
                    style={{ cursor: getCursorForAction(this.props.data.status) }}
                    disabled={isButtonDisabled(this.props.data.status)}>
                    <img src={getImageForButton('done')} alt={'done'} className="icon" />
                </button>
            </div>
        );
    }
}

function getImageForButton(action) {
    switch (action) {
    case "edit":
        return edit;
    case "remove":
        return remove;
    case "done":
        return done;
    default:
        return ' ';
    }
}

function getCursorForAction(status) {
    return status === 'Done' ? 'not-allowed' : 'allowed';
}

function isButtonDisabled(status) {
    return getCursorForAction(status) !== 'allowed' ? true: false;
}
