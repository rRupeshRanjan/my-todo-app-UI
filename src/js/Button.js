import '../css/Button.css';
import edit from '../images/edit.png'
import remove from '../images/remove.png'
import done from '../images/done.png'

function getImageForButton(action) {
    switch (action) {
    case "Update":
        return edit;
    case "Remove":
        return remove;
    case "Done":
        return done;
    default:
        return '';
    }
}

function getVisibility(visibility) {
    return visibility === false ? "none" : "block";
}

export default function Button(props) {
	const onClickHandler = () => props.action(props.taskId);

	return (
        <button onClick={onClickHandler}
                style={{display: getVisibility(props.visibility)}}
                title={props.id}>
            <img src={getImageForButton(props.id)} alt={props.id} className="icon" />
        </button>
    );
}