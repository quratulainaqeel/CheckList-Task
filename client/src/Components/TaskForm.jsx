import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [checklistItems, setChecklistItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');

  const handleAddChecklistItem = () => {
    if (newItemText.trim() !== '') {
      setChecklistItems([...checklistItems, { text: newItemText, checked: false }]);
      setNewItemText('');
    }
  };

  const handleCreateTask = () => {
    if (taskName.trim() === '' || checklistItems.length === 0) return;

    const newTask = {
      name: taskName,
      checklist: checklistItems
    };

    addTask(newTask);
    setTaskName('');
    setChecklistItems([]);
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Enter task name" />
      <ul>
        {checklistItems.map((item, index) => (
          <li key={index}>
            <input type="checkbox" checked={item.checked} onChange={() => {}} />
            {item.text}
          </li>
        ))}
      </ul>
      <input type="text" value={newItemText} onChange={(e) => setNewItemText(e.target.value)} placeholder="Enter checklist item" />
      <button onClick={handleAddChecklistItem}>Add Item</button>
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default TaskForm;
