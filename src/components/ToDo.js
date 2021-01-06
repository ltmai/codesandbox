import React from "react";
import { nanoid } from "nanoid";

/**
 * In this component:
 * - uses nanoid (a JS library) to generate unique task Id.
 * - task Id is stored as task property so it is also stable
 *   and can be used as list item key. It is not recommended
 *   to use list index as key if sorting or filtering may be
 *   applied. The best way to pick a key is to use a string
 *   that uniquely identifies a list item among its siblings.
 *   Most often you would use IDs from your data as keys
 * - Keys must only be unique among siblings, however tasks
 *   do not have inherently stable id, thus nanodid.
 */
class ToDo extends React.Component {
  constructor(props) {
    super(props);
    let firstTask = {
      description: "Click to change state",
      id: nanoid(),
      done: true
    };
    this.state = {
      tasks: [firstTask],
      description: ""
    };
    this.addTask = this.addTask.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  /**
   * Note the task description.
   * Even we update the state, React is smart enough to
   * check for changes in virtual DOM before updateing
   * the document DOM
   * @param {*} event
   */
  onChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  /**
   * Add new task
   * @param {*} event
   */
  addTask(event) {
    // prevent default behavior submitting the form
    event.preventDefault();

    if (!this.state.description.trim()) {
      return;
    }

    let newTask = {
      description: this.state.description,
      id: nanoid(),
      done: false
    };
    this.setState({
      tasks: [newTask, ...this.state.tasks],
      description: ""
    });
  }

  /**
   * Toggle task status
   * @param {*} id: the task id
   */
  toggle(id) {
    console.log(`toggle task ${id}`);
    let tasks = [...this.state.tasks];
    let task = tasks.find((t) => t.id === id);
    task.done = !task.done;

    this.setState({
      tasks: tasks
    });
  }

  render() {
    return (
      <form onSubmit={this.addTask}>
        <br />
        <label>Task </label>
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.description}
        />
        <button>Add</button>
        <ul>
          {this.state.tasks.map((task) => {
            return (
              <Item
                key={task.id}
                id={task.id}
                toggle={this.toggle}
                description={task.description}
                status={task.done}
              />
            );
          })}
        </ul>
      </form>
    );
  }
}

/**
 * props.description : task description
 * props.id : task id
 * props.toggle : function to toggle task status
 * props.status : false for new, true for done
 */
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  /**
   * Toggle the task status by forwarding the event together
   * with the component id to the parent component.
   * @param {*} event
   */
  toggle(event) {
    this.props.toggle(this.props.id);
  }

  render() {
    return (
      <li
        onClick={this.toggle}
        className={this.props.status ? "task-done box" : "task-new box"}
      >
        {this.props.description}
      </li>
    );
  }
}

export default ToDo;
