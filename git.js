import React, { useEffect, useState } from 'react';

interface Course {
  id: string; // assuming each course has an id
  title: string;
  description?: string;
}

const CreateDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/courses'); // adjust the URL if needed
        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.statusText}`);
        }
        const data: Course[] = await response.json();
        setCourses(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id} style={{ marginBottom: '1em' }}>
            <strong>{course.title}</strong>
            {course.description && <p>{course.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateDashboard;