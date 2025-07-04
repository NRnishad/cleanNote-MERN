import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './presentation/pages/HomePage.jsx';
import CreatePage from './presentation/pages/CreatePage.jsx';
import NoteDetailPage from './presentation/pages/NoteDetailPage.jsx';
import LoginPage from './presentation/pages/LoginPage.jsx';
import RegisterPage from './presentation/pages/RegisterPage.jsx';
import ProtectedRoute from './presentation/components/ProtectedRoute.jsx';
import './App.css';

function App() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes data-theme='forest'>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}
export default App;