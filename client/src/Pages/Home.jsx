import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { GlobalContext } from '../Context/Context';
import { decodeToken } from 'react-jwt'

const Home = () => {
  const { state } = useContext(GlobalContext)
  const user = decodeToken(state.token)

  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [checklistName, setChecklistName] = useState('');
  const [checklistItems, setChecklistItems] = useState(['']);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/get-all-task').then(json => {
      Filter(json.data.tasks)
    })
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddTask = (e) => {
    e.preventDefault();

    const payload = {
      taskTitle: taskTitle,
      checklists: [
        {
          name: checklistName,
          items: checklistItems.map(item => ({ text: item, checked: false }))
        }
      ],
      userEmail: user.email
    };

    axios.post('http://localhost:3000/api/add-task', payload).then(json => {
      Filter(json.data.tasks)
    })

    console.log(payload)
    // setTasks([...tasks, payload]);
    handleClose();
    setTaskTitle('');
    setChecklistName('');
    setChecklistItems(['']);
  };

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, '']);
  };

  const handleCheckItem = async (taskIndex, checklistIndex, itemIndex) => {
    const taskId = tasks[taskIndex]._id;
    const updatedItem = tasks[taskIndex].checklists[checklistIndex].items[itemIndex];
    updatedItem.checked = !updatedItem.checked;

    const payload = {
      _id: taskId,
      checklistIndex: checklistIndex,
      itemIndex: itemIndex,
      checked: updatedItem.checked
    }

    try {
      axios.put('http://localhost:3000/api/update-task', payload).then(json => {
        Filter(json.data.tasks)
      })

      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].checklists[checklistIndex].items[itemIndex] = updatedItem;
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating checkbox value:', error);
      // Handle error if needed
    }
  };

  const Filter = (task_list) => {
    const filteredTasks = task_list.filter(task => task.userEmail === user.email);
    setTasks(filteredTasks);
  }

  const handleItemChange = (index, e) => {
    const newItems = [...checklistItems];
    newItems[index] = e.target.value;
    setChecklistItems(newItems);
  };

  return (
    <div className='container'>
      <button className="btn btn-dark px-3 my-4" type="button" onClick={handleShow}>ADD Task</button>
      {tasks?.map((task, taskIndex) => (
        <div key={taskIndex} className="border my-3">
          <h1>{task.taskTitle}</h1>
          <hr />
          {task.checklists.map((checklist, checklistIndex) => (
            <div key={checklistIndex}>
              <h5>● {checklist.name}:</h5>
              <ul style={{ listStyle: 'none' }}>
                {checklist.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckItem(taskIndex, checklistIndex, itemIndex)}
                    />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddTask}>
            <div className="col">
              <label htmlFor="taskTitle" className="form-label">
                Task Title
              </label>
              <FloatingLabel controlId="taskTitle" label="Task Title" className="my-2 text-secondary">
                <Form.Control type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
              </FloatingLabel>
            </div>
            <div className="col">
              <label htmlFor="checklistName" className="form-label">
                Checklist Name
              </label>
              <FloatingLabel controlId="checklistName" label="Checklist Name" className="my-2 text-secondary">
                <Form.Control type="text" placeholder="Checklist Name" value={checklistName} onChange={(e) => setChecklistName(e.target.value)} />
              </FloatingLabel>
            </div>
            <div className="col">
              {checklistItems.map((item, index) => (
                <div key={index}>
                  <label htmlFor={`checklistItem${index}`} className="form-label">
                    Checklist Item {index + 1}
                  </label>
                  <FloatingLabel controlId={`checklistItem${index}`} label={`Checklist Item ${index + 1}`} className="my-2 text-secondary">
                    <Form.Control type="text" placeholder={`Checklist Item ${index + 1}`} value={item} onChange={(e) => handleItemChange(index, e)} />
                  </FloatingLabel>
                </div>
              ))}
              <button className='btn btn-dark my-3 d-block' type="button" onClick={handleAddChecklistItem}>Add Another Item</button>
            </div>
            <div className='d-flex justify-content-end'>
              <button type='submit' className='btn btn-danger' onClick={handleClose}>ADD</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
