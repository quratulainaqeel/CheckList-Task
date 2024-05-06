import TaskComponent from '../Components/TaskComponent';
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Home = () => {

  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const ADDTask = () => {
    if (task !== '') {
      setTaskList([...taskList, task]);
      // setTask('');
      console.log(task)
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tasks, setTasks] = useState([
    {
      name: 'checklist 1',
      checklist: [
        { text: 'I have', checked: false },
        { text: 'created', checked: false },
        { text: 'something big!', checked: false }
      ]
    },
    {
      name: 'checklist 2',
      checklist: [
        { text: 'Hello', checked: false },
        { text: 'I am', checked: false },
        { text: 'Ready!', checked: false }
      ]
    }
  ]);

  return (
    <div className='container'>

      <div className="input-group mt-5  my-3 ">
        <input
          type="text"
          className="form-control py-2"
          placeholder="Enter a new Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-dark px-3" type="submit" onClick={ADDTask}>ADD Task</button>
      </div>

      <div className='border my-3'>

        <div className='my-3 mx-2'>
          <div className='d-flex justify-content-between'>
            <h4>Task 1</h4>
            <button className="btn btn-primary px-3" >Add CheckList</button>
          </div>
          <hr />

          <ul>
            <li>CheckList 1</li>
            <ul className='list-unstyled'>
              <li><input type="checkbox" name="" id="" /> I have </li>
              <li><input type="checkbox" name="" id="" /> I have </li>
              <li><input type="checkbox" name="" id="" /> I have </li>
            </ul>
          </ul>

          <ul>
            <li>CheckList 1</li>
            <ul className='list-unstyled'>
              <li><input type="checkbox" name="" id="" /> I have </li>
              <li><input type="checkbox" name="" id="" /> I have </li>
              <li><input type="checkbox" name="" id="" /> I have </li>
            </ul>
          </ul>


        </div>

      </div>

      <div className='border my-3'>

        <div className='my-3 mx-2'>
          <div className='d-flex justify-content-between'>
            <h4>Task 1</h4>
            <button className="btn btn-primary px-3" >Add CheckList</button>
          </div>
          <hr />

          <ul>
            <li>CheckList 1</li>
            <ul>
              <li>hi bro</li>
              <li>hi bro</li>
              <li>hi bro</li>
            </ul>

          </ul>
        </div>

      </div>

      {/* <button className="btn btn-dark ms-auto" type="submit" onClick={handleShow}>New Task</button> */}

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleClose}>
           Add
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* <Accordion defaultActiveKey="0" >

        <Accordion.Item eventKey="1">
          <Accordion.Header> <h5>Task 01</h5> </Accordion.Header>
          <Accordion.Body >
            {tasks.map((task, index) => (
              <TaskComponent key={index} task={task} />
            ))}
          </Accordion.Body>
        </Accordion.Item>

      </Accordion> */}

    </div>
  );
}

export default Home




// import React, { useState } from 'react';
// import TaskForm from '../Components/TaskForm';
// import TaskList from '../Components/TaskList';

// const Home = () => {
//   const [tasks, setTasks] = useState([]);

//   const addTask = (task) => {
//     setTasks([...tasks, task]);
//   };

//   const handleCheck = (taskIndex, itemIndex) => {
//     const updatedTasks = [...tasks];
//     updatedTasks[taskIndex].checklist[itemIndex].checked = !updatedTasks[taskIndex].checklist[itemIndex].checked;
//     setTasks(updatedTasks);
//   };

//   return (
//     <div>
//       <TaskForm addTask={addTask} />
//       <TaskList tasks={tasks} handleCheck={handleCheck} />
//     </div>
//   );
// };

// export default Home;
