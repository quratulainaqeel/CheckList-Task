import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [checklistName, setChecklistName] = useState('');
  const [checklistItems, setChecklistItems] = useState(['']);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      title: taskTitle,
      checklists: [
        {
          name: checklistName,
          items: checklistItems.map(item => ({ name: item, checked: false }))
        }
      ]
    };
    setTasks([...tasks, newTask]);
    handleClose();
    setTaskTitle('');
    setChecklistName('');
    setChecklistItems(['']);
  };

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, '']);
  };

  const handleCheckItem = (taskIndex, checklistIndex, itemIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].checklists[checklistIndex].items[itemIndex].checked = !updatedTasks[taskIndex].checklists[checklistIndex].items[itemIndex].checked;
    setTasks(updatedTasks);
  };

  const handleItemChange = (index, e) => {
    const newItems = [...checklistItems];
    newItems[index] = e.target.value;
    setChecklistItems(newItems);
  };

  return (
    <div className='container'>
      <button className="btn btn-dark px-3 my-4" type="button" onClick={handleShow}>ADD Task</button>
      {tasks.map((task, taskIndex) => (
        <div key={taskIndex} className="border my-3">
          <h4>{task.title}</h4>
          {task.checklists.map((checklist, checklistIndex) => (
            <div key={checklistIndex}>
              <p>● {checklist.name}:</p>
              <ul>
                {checklist.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckItem(taskIndex, checklistIndex, itemIndex)}
                    />
                    {item.name}
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
