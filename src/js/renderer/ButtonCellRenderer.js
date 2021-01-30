import { IconButton } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Delete, Edit, DoneAll } from '@material-ui/icons';

export default function ButtonCellRenderer(props) {
    var buttonDisabled = isButtonDisabled(props.data.status);

    return (
        <div>
            <IconButton
                title='edit' variant='contained' color='primary'
                onClick={ () => props.editAction(props.data.id) }
                disabled={buttonDisabled}>
                <Edit/>
            </IconButton>

            <IconButton
                title='mark done' variant='contained'
                onClick={ () => props.markDoneAction(props.data) }
                disabled={buttonDisabled}>
                { getMarkDoneButtonWithStyle(buttonDisabled) }
            </IconButton>

            <IconButton
                title='remove' variant='contained' color='secondary'
                onClick={ () => props.deleteAction(props.data.id) }>
                <Delete/>
            </IconButton>
        </div>
    );
}

function getMarkDoneButtonWithStyle(buttonDisabled) {
    return (buttonDisabled) ? (<DoneAll/>) : (<DoneAll style={{color: green[900] }}/>);
}

function isButtonDisabled(status) {
    return status === 'Done';
}
