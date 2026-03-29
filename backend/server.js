const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample data
const courses = [
  { id: 1, title: 'Introduction to Computer Networks', description: 'Learn the fundamentals of computer networking including OSI model, TCP/IP, and protocols.', instructor: 'Dr. Ahmed Khan', duration: '6 weeks', level: 'Beginner', students: 120 },
  { id: 2, title: 'Network Security Fundamentals', description: 'Explore firewalls, encryption, VPNs and modern cybersecurity practices.', instructor: 'Prof. Sara Ali', duration: '8 weeks', level: 'Intermediate', students: 85 },
  { id: 3, title: 'Routing & Switching', description: 'Deep dive into routers, switches, VLANs, and spanning tree protocol.', instructor: 'Dr. Bilal Hassan', duration: '10 weeks', level: 'Advanced', students: 65 },
  { id: 4, title: 'Wireless Networking', description: 'Wi-Fi standards, wireless security, and mobile networking technologies.', instructor: 'Dr. Ahmed Khan', duration: '5 weeks', level: 'Intermediate', students: 95 },
  { id: 5, title: 'Cloud Networking', description: 'AWS, Azure, GCP networking concepts, virtual private clouds and hybrid architectures.', instructor: 'Prof. Zara Malik', duration: '7 weeks', level: 'Advanced', students: 78 },
  { id: 6, title: 'Network Troubleshooting', description: 'Practical skills for diagnosing and resolving common network issues.', instructor: 'Prof. Sara Ali', duration: '4 weeks', level: 'Beginner', students: 110 },
];

const lessons = [
  { id: 1, courseId: 1, title: 'OSI Model Overview', content: 'Introduction to the 7-layer OSI reference model.', duration: '45 min', order: 1 },
  { id: 2, courseId: 1, title: 'TCP/IP Protocol Suite', content: 'Understanding TCP and IP protocols and their roles.', duration: '60 min', order: 2 },
  { id: 3, courseId: 1, title: 'IP Addressing and Subnetting', content: 'IPv4, IPv6 addressing and CIDR notation.', duration: '90 min', order: 3 },
  { id: 4, courseId: 2, title: 'Firewall Configuration', content: 'Setting up and managing firewalls for network protection.', duration: '75 min', order: 1 },
  { id: 5, courseId: 2, title: 'VPN Setup and Management', content: 'Configuring site-to-site and remote access VPNs.', duration: '80 min', order: 2 },
  { id: 6, courseId: 3, title: 'VLAN Configuration', content: 'Creating and managing VLANs on managed switches.', duration: '70 min', order: 1 },
  { id: 7, courseId: 3, title: 'Spanning Tree Protocol', content: 'Preventing network loops with STP and RSTP.', duration: '65 min', order: 2 },
  { id: 8, courseId: 4, title: 'Wi-Fi Standards (802.11)', content: 'Overview of 802.11a/b/g/n/ac/ax standards.', duration: '55 min', order: 1 },
  { id: 9, courseId: 5, title: 'Virtual Private Cloud', content: 'Designing VPCs in cloud environments.', duration: '85 min', order: 1 },
  { id: 10, courseId: 6, title: 'Using Wireshark', content: 'Packet capture and analysis with Wireshark.', duration: '90 min', order: 1 },
];

const assignments = [
  { id: 1, courseId: 1, title: 'OSI Model Lab', description: 'Map network traffic to OSI layers using Wireshark.', dueDate: '2025-02-15', points: 50 },
  { id: 2, courseId: 1, title: 'Subnetting Quiz', description: 'Calculate subnet masks and host ranges for given networks.', dueDate: '2025-02-22', points: 30 },
  { id: 3, courseId: 2, title: 'Firewall Rules Project', description: 'Design a firewall rule set for a small business network.', dueDate: '2025-03-01', points: 100 },
  { id: 4, courseId: 2, title: 'VPN Implementation', description: 'Configure and test a site-to-site VPN between two routers.', dueDate: '2025-03-10', points: 80 },
  { id: 5, courseId: 3, title: 'VLAN Design Project', description: 'Design a VLAN structure for a university campus network.', dueDate: '2025-03-20', points: 120 },
  { id: 6, courseId: 4, title: 'Wireless Security Audit', description: 'Audit and harden a wireless network against common attacks.', dueDate: '2025-04-01', points: 90 },
  { id: 7, courseId: 5, title: 'Cloud VPC Design', description: 'Design a multi-tier VPC architecture on AWS.', dueDate: '2025-04-15', points: 110 },
  { id: 8, courseId: 6, title: 'Network Diagnosis Report', description: 'Diagnose and document a set of simulated network faults.', dueDate: '2025-04-22', points: 70 },
];

const enrollments = [
  { id: 1, studentName: 'Ali Hassan', email: 'ali@example.com', courseId: 1, courseName: 'Introduction to Computer Networks', enrolledAt: '2025-01-10', status: 'active' },
  { id: 2, studentName: 'Fatima Khan', email: 'fatima@example.com', courseId: 2, courseName: 'Network Security Fundamentals', enrolledAt: '2025-01-12', status: 'active' },
  { id: 3, studentName: 'Omar Sheikh', email: 'omar@example.com', courseId: 1, courseName: 'Introduction to Computer Networks', enrolledAt: '2025-01-15', status: 'completed' },
  { id: 4, studentName: 'Aisha Malik', email: 'aisha@example.com', courseId: 3, courseName: 'Routing & Switching', enrolledAt: '2025-01-18', status: 'active' },
  { id: 5, studentName: 'Zaid Ahmed', email: 'zaid@example.com', courseId: 4, courseName: 'Wireless Networking', enrolledAt: '2025-01-20', status: 'active' },
  { id: 6, studentName: 'Nadia Raza', email: 'nadia@example.com', courseId: 5, courseName: 'Cloud Networking', enrolledAt: '2025-01-22', status: 'pending' },
];

// Routes
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ error: 'Course not found' });
  const courseLessons = lessons.filter(l => l.courseId === course.id);
  const courseAssignments = assignments.filter(a => a.courseId === course.id);
  res.json({ ...course, lessons: courseLessons, assignments: courseAssignments });
});

app.get('/api/lessons', (req, res) => {
  const lessonsWithCourse = lessons.map(lesson => {
    const course = courses.find(c => c.id === lesson.courseId);
    return { ...lesson, courseName: course ? course.title : 'Unknown' };
  });
  res.json(lessonsWithCourse);
});

app.get('/api/assignments', (req, res) => {
  const assignmentsWithCourse = assignments.map(assignment => {
    const course = courses.find(c => c.id === assignment.courseId);
    return { ...assignment, courseName: course ? course.title : 'Unknown' };
  });
  res.json(assignmentsWithCourse);
});

app.get('/api/enrollments', (req, res) => {
  res.json(enrollments);
});

app.post('/api/courses', (req, res) => {
  const { title, description, instructor, duration, level } = req.body;
  const newCourse = { id: courses.length + 1, title, description, instructor, duration, level, students: 0 };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.post('/api/enrollments', (req, res) => {
  const { studentName, email, courseId } = req.body;
  const course = courses.find(c => c.id === parseInt(courseId));
  const newEnrollment = {
    id: enrollments.length + 1,
    studentName,
    email,
    courseId: parseInt(courseId),
    courseName: course ? course.title : 'Unknown',
    enrolledAt: new Date().toISOString().split('T')[0],
    status: 'active',
  };
  enrollments.push(newEnrollment);
  res.status(201).json(newEnrollment);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
