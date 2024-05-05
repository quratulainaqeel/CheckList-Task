import TaskComponent from '../Components/TaskComponent';
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

const Home = () => {
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

      <button className="btn btn-dark" type="submit" onClick={''}>New Task</button>

      <Accordion defaultActiveKey="0" className='mx-5'>

        <Accordion.Item eventKey="1">
          <Accordion.Header> <h5>Task 01</h5> </Accordion.Header>
          <Accordion.Body>
            {tasks.map((task, index) => (
              <TaskComponent key={index} task={task} />
            ))}
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>

    </div>
  );
}

export default Home
