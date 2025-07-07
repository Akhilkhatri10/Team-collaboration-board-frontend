import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditDeleteTask = ({ task }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        assignedTo: '',
        dueDate: '',
        boardId: ''
    });

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                assignedTo: task.assignedTo || '',
                dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
                boardId: task.boardId
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating task with ID:", task._id);
            console.log("Sending data:", form);

            const updateData = {
                ...form,
            };

            // Avoid sending empty assignedTo field
            if (!updateData.assignedTo) {
                delete updateData.assignedTo;
            }

            const response = await axios.put(
                `https://team-collaboration-board-backend.onrender.com/api/tasks/PUT/tasks/${task._id}`,
                updateData
            );

            alert('Task updated successfully');
            console.log("Updated Task Response:", response.data);

        } catch (err) {
            console.error("Error during task update:", err);
            alert('Failed to update task');

        }
    };


    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await axios.delete(`https://team-collaboration-board-backend.onrender.com/api/tasks/DELETE/tasks/${task._id}`);
            alert('Task deleted successfully');

        } catch (err) {
            console.error(err);
            alert('Failed to delete task');
            
        }
    };

    return (
        <div className="edit-task-container">
            <h2>Edit or Delete Task</h2>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>Title</label>
                    <input name="title" value={form.title} onChange={handleChange} required />
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
                    <label>Assigned To (user ID)</label>
                    <input name="assignedTo" value={form.assignedTo} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Due Date</label>
                    <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Board ID</label>
                    <input name="boardId" value={form.boardId} onChange={handleChange} />
                </div>

                <button type="submit">Update Task</button>
                <button type="button" className="delete-task-btn" onClick={handleDelete}>Delete Task</button>
            </form>

            <style>{`
        .edit-task-container {
          padding: 20px;
        }

        h2 {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input, textarea, select {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }

        button {
          padding: 10px 15px;
          margin-right: 10px;
          border: none;
          cursor: pointer;
          background-color: #4caf50;
          color: white;
          border-radius: 4px;
        }

        .delete-task-btn {
          background-color: #f44336;
        }

        button:hover {
          opacity: 0.9;
        }
      `}</style>
        </div>
    );
};

export default EditDeleteTask;
