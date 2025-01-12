import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import DisplayTask from '../DisplayTask/index'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class CreateTask extends Component {
  state = {
    taskInput: '',
    tagsInput: tagsList[0].optionId,
    tasksList: [],
    activeTag: 'INITIAL',
  }

  onChangeTag = event => {
    this.setState({tagsInput: event.target.value})
  }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onClickActiveTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {tagsInput, taskInput} = this.state
    const updateList = {
      tag: tagsInput,
      task: taskInput,
      id: uuidv4(),
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, updateList],
      tagsInput: tagsList[0].optionId,
      taskInput: '',
    }))
  }

  render() {
    const {taskInput, tagsInput, tasksList, activeTag} = this.state
    const filteredTask =
      activeTag === 'INITIAL'
        ? tasksList
        : tasksList.filter(each => each.tag === activeTag)
    return (
      <div className="app-container">
        <div className="create-task-container">
          <h1 className="heading">Create a task!</h1>
          <form className="form" onSubmit={this.onSubmitTask}>
            <label htmlFor="taskId" className="label">
              Task
            </label>
            <input
              type="text"
              id="taskId"
              className="input-task"
              placeholder="Enter the task here"
              value={taskInput}
              onChange={this.onChangeTaskInput}
            />
            <label htmlFor="tagId" className="label">
              Tags
            </label>
            <select
              className="select"
              id="tagId"
              value={tagsInput}
              onChange={this.onChangeTag}
            >
              {tagsList.map(tags => (
                <option
                  key={tags.optionId}
                  value={tags.optionId}
                  className="option"
                >
                  {tags.displayText}
                </option>
              ))}
            </select>
            <button className="add-task-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="task-container">
          <h2 className="mid-heading">Tags</h2>
          <ul className="tags-list">
            {tagsList.map(tag => {
              const isActive = activeTag === tag.optionId
              return (
                <li key={tag.optionId}>
                  <button
                    type="button"
                    onClick={this.onClickActiveTag}
                    value={tag.optionId}
                    className={isActive ? 'active-tag' : 'tag-button'}
                  >
                    {tag.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h2 className="mid-heading">Tasks</h2>
          {tasksList.length <= 0 ? (
            <div className="no-task-container">
              <h1 className="no-task">No Tasks Added Yet</h1>
            </div>
          ) : (
            <ul className="task-list">
              {filteredTask.map(taskItem => (
                <DisplayTask key={taskItem.id} taskDetails={taskItem} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default CreateTask
