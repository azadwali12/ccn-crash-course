import React from 'react';

const CourseDetailsPage = () => {
    // Sample course data (replace with real data)
    const course = {
        id: 1,
        title: 'Sample Course',
        description: 'This is a sample description for the course.',
        duration: '3 weeks',
        instructor: 'John Doe',
    };

    return (
        <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
        </div>
    );
};

export default CourseDetailsPage;