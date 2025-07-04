import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BoardListSidebar = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/boards/GET/boards');
        setBoards(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to load boards:", err);
      }
    };

    fetchBoards();
  }, []);

  const handleAddBoard = async () => {
    const name = prompt("Enter board name:");
    if (!name) return;

    try {
      const res = await axios.post('http://localhost:3000/api/boards/POST/boards', { name });
      setBoards(prev => [...prev, res.data.data || res.data]);
    } catch (err) {
      console.error("Failed to add board:", err);
    }
  };

  return (
    <div className="board-list-sidebar">
      <h2>Boards</h2>
      <ul>
        {boards.map((board) => (
          <li key={board._id}>
            <Link to={`/boards/${board._id}`}>{board.name}</Link>
          </li>
        ))}
      </ul>
      <button className="add-board-btn" onClick={handleAddBoard}>
        + Add New Board
      </button>

      <style>{`
        .board-list-sidebar {
          width: 200px;
          padding: 20px;
          background-color: #e6e6e6;
          border-right: 1px solid #ccc;
          height: 100vh;
        }

        .board-list-sidebar h2 {
          margin-bottom: 15px;
          font-size: 18px;
        }

        .board-list-sidebar ul {
          list-style-type: none;
          padding: 0;
        }

        .board-list-sidebar li {
          margin-bottom: 10px;
        }

        .board-list-sidebar a {
          text-decoration: none;
          color: #333;
        }

        .board-list-sidebar a:hover {
          font-weight: bold;
        }

        .add-board-btn {
          margin-top: 20px;
          padding: 8px 12px;
          border: none;
          background-color: #4caf50;
          color: white;
          cursor: pointer;
          border-radius: 4px;
        }

        .add-board-btn:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default BoardListSidebar;
