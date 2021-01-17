export default function Button(props) {
	const onClickHandler = () => props.action(props.taskId);
	return (
		<button onClick={onClickHandler}> {props.text} </button>
	);
}