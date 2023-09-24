import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import { SERVER_URL } from '../constants';

const AdminHome = () => {
  const [message, setMessage] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch(`${SERVER_URL}/student`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => {
        console.error('exception fetchStudents ' + err);
        setMessage('Exception. ' + err.message);
      });
  };

  const addStudent = (student_name, student_email) => {
    setMessage('');
    fetch(`${SERVER_URL}/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: student_name, email: student_email }),
    })
      .then((res) => {
        if (res.ok) {
          setMessage('Student added.');
          fetchStudents();
        } else {
          console.error('error addStudent ' + res.status);
          setMessage('Error. ' + res.status);
        }
      })
      .catch((err) => {
        console.error('exception addStudent ' + err);
        setMessage('Exception. ' + err.message);
      });
  };

  const editStudent = (student_id, student_name, student_email, statusCode, status) => {
    setMessage('');
    fetch(`${SERVER_URL}/student/${student_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: student_name, email: student_email, statusCode, status }),
    })
      .then((res) => {
        if (res.ok) {
          setMessage('Student updated.');
          fetchStudents();
        } else {
          console.error('error updateStudent ' + res.status);
          setMessage('Error. ' + res.status);
        }
      })
      .catch((err) => {
        console.error('exception updateStudent ' + err);
        setMessage('Exception. ' + err.message);
      });
  };

  const deleteStudent = (student_id) => {
    setMessage('');

    const handleDelete = (url) => {
      fetch(url, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            setMessage('Student dropped.');
            fetchStudents();
          } else {
            res.json().then((data) => {
              if (data.message === "Student has enrollments. Use 'force' parameter to delete.") {
                if (window.confirm('This student has enrollments. Continue with deletion?')) {
                  handleDelete(`${SERVER_URL}/student/${student_id}?force=yes`);
                }
              }
            });
          }
        })
        .catch((err) => {
          console.error('exception dropStudent ' + err);
          setMessage('Exception. ' + err.message);
        });
    };

    if (window.confirm('Are you sure you want to delete the student?')) {
      handleDelete(`${SERVER_URL}/student/${student_id}`);
    }
  };

  const headers = ['Student ID', 'Name', 'Email', 'Status Code', 'Status', ' ', ' '];

  if (students.length === 0) {
    return (
      <div>
        <h3>No Enrolled Students</h3>
        <h4>{message}</h4>
        <AddStudent addStudent={addStudent} />
      </div>
    );
  } else {
    return (
      <div style={{ margin: 'auto' }}>
        <h3>Student List</h3>
        <div style={{ margin: 'auto' }}>
          <h4>{message}</h4>
          <table className="Center">
            <thead>
              <tr>
                {headers.map((s, idx) => (
                  <th key={idx}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.student_id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.statusCode}</td>
                  <td>{row.status}</td>
                  <td>
                    <EditStudent student={row} editStudent={editStudent} />
                  </td>
                  <td>
                    <button type="button" margin="auto" onClick={() => deleteStudent(row.student_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AddStudent addStudent={addStudent} />
        </div>
      </div>
    );
  }
};

export default AdminHome;
