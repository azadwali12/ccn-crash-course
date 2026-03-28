import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Lessons from './pages/Lessons';
import Assignments from './pages/Assignments';
import Enrollments from './pages/Enrollments';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/enrollments" element={<Enrollments />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
