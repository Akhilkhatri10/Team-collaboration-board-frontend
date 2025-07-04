import React, { useState } from 'react';
import axios from 'axios';

const TaskModalForm = ({ boardId }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        assignedTo: '',
        dueDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Sending data:", { ...form, boardId }); // ⬅️ Add this

        try {
            const res = await axios.post(
                `http://localhost:3000/api/tasks/POST/boards/${boardId}/tasks`,
                { ...form }
            );
            alert('Task created successfully!');
            setForm({
                title: '',
                description: '',
                status: 'todo',
                priority: 'medium',
                assignedTo: '',
                dueDate: ''
            });
        } catch (error) {
            console.error(error);
            alert('Error creating task');
        }
    };

    return (
        <div className="task-modal-form">
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Task Title</label>
                    <input type="text" name="title" value={form.title} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={form.status} onChange={handleChange}>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Priority</label>
                    <select name="priority" value={form.priority} onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Assigned To (User ID)</label>
                    <input type="text" name="assignedTo" value={form.assignedTo} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Due Date</label>
                    <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
                </div>

                <button type="submit">Create Task</button>
            </form>

            <style>{`
        .task-modal-form {
          padding: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        input, textarea, select {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }

        button {
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.9;
        }
      `}</style>
        </div>
    );
};

export default TaskModalForm;
