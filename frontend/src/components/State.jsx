import { useEffect, useState } from 'react';
import styles from '../cssModules/App.module.css';

export default function State() {
    const [ state, setState ] = useState(null);
  useEffect(() => {
    fetch('http://localhost:4000/api/stats')
      .then(response => response.json())
      .then(data => setState(data))
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  function handleRun(taskId) {
    fetch(`http://localhost:4000/api/run/${taskId}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error running task:', error));
  }

  function handleCancel(taskId) {
    fetch(`http://localhost:4000/api/cancel/${taskId}`, {
      method: 'POST', 
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error cancelling task:', error));
  }
  
  return (
    <div>
      <h1>Task Management System</h1>
      {state ? (
        <div>
          <p>Total Tasks: {state.length}</p>
          <div className={styles.task} style={{ fontWeight: 'bold', backgroundColor: '#9a8a8a' }}>
            <p>Task Name</p>
            <p>Status</p>
            <p>Dependencies</p>
            <p>Retries</p>
            <p>Attempts</p>
          </div>

          {state.map((task, index) => (
            <div key={index} className={styles.task}>
              <p>{task.taskName}</p>
              <p>{task.status}</p>
              <p>{task.dependencies.join(', ')}</p>
              <p>{task.retries}</p>
              <p className={styles.attempts}>
                {task.attempts}
                <button onClick={() => handleRun(task._id)}>Run</button>
                <button onClick={() => handleCancel(task._id)}>Cancel</button>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  )
}