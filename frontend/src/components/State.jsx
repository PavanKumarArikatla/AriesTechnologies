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
                <button>Run</button>
                <button>Cancel</button>
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