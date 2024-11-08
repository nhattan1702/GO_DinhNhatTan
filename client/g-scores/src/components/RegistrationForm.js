import React, { useState } from 'react';
import axios from 'axios';
import '../styles/main.css';

const RegistrationForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [scoreData, setScoreData] = useState(null);

  const languageMap = {
    N1: 'English',
    N2: 'French',
    N3: 'German',
    N4: 'Spanish',
    N5: 'Chinese',
    N6: 'Japanese',
    N7: 'Korean',
  };


  const validateInput = (value) => {
    if (!value) {
      return "Registration number is required.";
    }
    if (!/^[0-9]+$/.test(value)) {
      return "Please enter numbers only.";
    }
    return ""; 
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const validationError = validateInput(value);
    setError(validationError);
    if (!validationError) {
      setInputValue(value);
    } else {
      setInputValue("");
    }
  };

  const fetchScoreData = async (registrationNumber) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/check-score', {
        registration_number: registrationNumber
      });
      setScoreData(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching score data:", error);
      if (error.response && error.response.status === 404) {
        setError("Registration number not found.");
      } else {
        setError("An unexpected error occurred.");
      }
      setScoreData(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationError = validateInput(inputValue);
    if (validationError) {
      setError(validationError);
    } else {
      fetchScoreData(inputValue);
    }
  };

  return (
    <div>
      <div className="card">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter registration number"
              value={inputValue}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>

      <div className="card">
        <h2>Detailed Scores</h2>
        {scoreData ? (
          <div>
            <p>Registration Number: {scoreData.registration_number}</p>
            {scoreData.math !== null && <p>Math: {scoreData.math}</p>}
            {scoreData.literature !== null && <p>Literature: {scoreData.literature}</p>}
            {scoreData.foreign_language !== null && (
              <p>
                Foreign Language - {languageMap[scoreData.foreign_language_code] || 'Unknown'}: {scoreData.foreign_language}
              </p>
            )}
            {scoreData.physics !== null && <p>Physics: {scoreData.physics}</p>}
            {scoreData.chemistry !== null && <p>Chemistry: {scoreData.chemistry}</p>}
            {scoreData.biology !== null && <p>Biology: {scoreData.biology}</p>}
            {scoreData.history !== null && <p>History: {scoreData.history}</p>}
            {scoreData.geography !== null && <p>Geography: {scoreData.geography}</p>}
            {scoreData.civic_education !== null && <p>Civic Education: {scoreData.civic_education}</p>}
          </div>
        ) : (
          <p>No score data available.</p>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
