import './index.css'

const DisplayTask = props => {
  const {taskDetails} = props
  return (
    <li className="task-item">
      <p className="task">{taskDetails.task}</p>
      <p className="tag">{taskDetails.tag}</p>
    </li>
  )
}
export default DisplayTask
