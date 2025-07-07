import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditDeleteTask from './EditDeleteTask';
import TaskModalForm from './TaskModalForm';

const BoardDetailPage = () => {
  const { id: boardId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [boardId]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`https://team-collaboration-board-backend.onrender.com/api/tasks/GET/boards/${boardId}/tasks`);
      setTasks(res.data.data || res.data);

    } catch (err) {
      console.error("Error fetching tasks:", err);
      alert('Failed to load tasks. Please try again later.');

    } finally {
      setLoading(false);
      
    }
  };

  const groupedTasks = {
    todo: tasks.filter(task => task.status === 'todo'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    done: tasks.filter(task => task.status === 'done'),
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowForm(false); // close the form if editing
  };

  const handleNewTaskCreated = () => {
    fetchTasks();         // refresh tasks list
    setShowForm(false);   // close the form after adding
  };

  return (
    <div className="board-detail-page">
      <h1>Board Detail</h1>

      <div className="board-tasks">
        {['todo', 'in-progress', 'done'].map(status => (
          <div key={status} className="task-column">
            <h2>{status.replace('-', ' ')}</h2>
            {groupedTasks[status].map(task => (
              <div key={task._id} className="task-card" onClick={() => handleTaskClick(task)}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={() => {
          setSelectedTask(null);
          setShowForm(prev => !prev);
        }}>
          {showForm ? "Cancel" : "+ Add New Task"}
        </button>
      </div>

      {showForm && (
        <div className="create-task-form">
          <TaskModalForm boardId={boardId} onSuccess={handleNewTaskCreated} />
        </div>
      )}

      {selectedTask && (
        <div className="edit-task-section">
          <EditDeleteTask task={selectedTask} onUpdate={fetchTasks} />
        </div>
      )}

      <style>{`
        .board-detail-page {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .board-tasks {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .task-column {
          flex: 1;
          background: #f4f4f4;
          border-radius: 8px;
          padding: 15px;
        }

        .task-card {
          background: white;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;
          cursor: pointer;
        }

        .task-card:hover {
          background: #e0f7fa;
        }

        .actions {
          margin-top: 30px;
        }

        .actions button {
          padding: 10px 15px;
          background-color: #2196f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .actions button:hover {
          opacity: 0.9;
        }

        .create-task-form,
        .edit-task-section {
          margin-top: 30px;
          padding: 20px;
          border-top: 2px dashed #ccc;
        }
      `}</style>
    </div>
  );
};

export default BoardDetailPage;
