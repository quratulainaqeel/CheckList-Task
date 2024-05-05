import React, { useState } from 'react';

const TaskComponent = ({ task }) => {
  const [checklistItems, setChecklistItems] = useState(task.checklist);

  const handleCheckboxChange = (index) => {
    const newChecklist = [...checklistItems];
    newChecklist[index].checked = !newChecklist[index].checked;
    setChecklistItems(newChecklist);
  };

  return (
    <div>
      <h5>{task.name}</h5>
      {checklistItems.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleCheckboxChange(index)}
          />
          <label>{item.text}</label>
        </div>
      ))}
    </div>
  );
};

export default TaskComponent;
