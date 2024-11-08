import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';

const Top10 = () => {
  const [top10Data, setTop10Data] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState("A");

  const fetchTop10Data = async (group) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/top-10-group-${group.toLowerCase()}`);
      if (Array.isArray(response.data)) {
        setTop10Data(response.data);
        setError("");
      } else {
        setError("Unexpected data format received.");
      }
    } catch (error) {
      setError("An error occurred while fetching top 10 data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTop10Data(selectedGroup);
  }, [selectedGroup]);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  return (
    <div className="card">
      <h2>Top 10 Students</h2>
      <div className="form-group">
        <label htmlFor="group-select">Select Group: </label>
        <select id="group-select" value={selectedGroup} onChange={handleGroupChange}>
          <option value="A">Group A (Math, Physics, Chemistry)</option>
          <option value="B">Group B (Math, Chemistry, Biology)</option>
          <option value="C">Group C (Literature, History, Geography)</option>
        </select>
      </div>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        top10Data.length > 0 ? (
          <table className="top10-table">
            <thead>
              <tr>
                <th>Registration Number</th>
                <th>{selectedGroup === "C" ? "Literature" : "Math"}</th>
                <th>{selectedGroup === "A" ? "Physics" : selectedGroup === "B" ? "Chemistry" : "History"}</th>
                <th>{selectedGroup === "A" ? "Chemistry" : selectedGroup === "B" ? "Biology" : "Geography"}</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              {top10Data.map((student) => (
                <tr key={student.registration_number}>
                  <td>{student.registration_number}</td>
                  <td>{student[selectedGroup === "C" ? "literature" : "math"] ?? 'N/A'}</td>
                  <td>{student[selectedGroup === "A" ? "physics" : selectedGroup === "B" ? "chemistry" : "history"] ?? 'N/A'}</td>
                  <td>{student[selectedGroup === "A" ? "chemistry" : selectedGroup === "B" ? "biology" : "geography"] ?? 'N/A'}</td>
                  <td>
                    {selectedGroup === "A" && student.math && student.physics && student.chemistry
                      ? student.math + student.physics + student.chemistry
                      : selectedGroup === "B" && student.math && student.chemistry && student.biology
                      ? student.math + student.chemistry + student.biology
                      : selectedGroup === "C" && student.literature && student.history && student.geography
                      ? student.literature + student.history + student.geography
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available.</p>
        )
      )}
    </div>
  );
};

export default Top10;
