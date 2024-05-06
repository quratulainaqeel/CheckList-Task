import React from 'react';

const TaskList = ({ tasks, handleCheck }) => {
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.name}</h3>
            <ul>
              {task.checklist.map((item, idx) => (
                <li key={idx}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheck(index, idx)}
                  />
                  {item.text}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
