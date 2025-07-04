import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardListSidebar from './components/BoardListSidebar';
import BoardDetailPage from './components/BoardDetailPage';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <BoardListSidebar />
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/boards/:id" element={<BoardDetailPage />} />
            <Route path="*" element={<h2>Select a board to get started</h2>} />
          </Routes>
        </main>

        <style>{`
          .app-container {
            display: flex;
            height: 100vh;
            font-family: Arial, sans-serif;
          }

          .sidebar {
            width: 250px;
            background-color: #f2f2f2;
            padding: 20px;
            border-right: 1px solid #ddd;
          }

          .main-content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
          }
        `}</style>
      </div>
    </Router>
  );
};

export default App;




