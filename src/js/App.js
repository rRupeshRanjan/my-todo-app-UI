import '../css/App.css';
import TaskTable from './TaskTable.js';

export default function App() {
  return (
    <>
    <div>
      <div className="App-header"> To-Do App </div>
      <br /> 
      <br />
      <TaskTable/>
    </div>
    </>
  );
}
