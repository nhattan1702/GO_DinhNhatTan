/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Report = () => {
  const [subjectChartData, setSubjectChartData] = useState(null);
  const [languageChartData, setLanguageChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const languageMap = {
    N1: 'English',
    N2: 'French',
    N3: 'German',
    N4: 'Spanish',
    N5: 'Chinese',
    N6: 'Japanese',
    N7: 'Korean'
  };

  useEffect(() => {
    let isMounted = true; 
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/score-statistics');
        if (isMounted) {
          const data = response.data;
          const subjects = Object.keys(data.subjects);
          const subjectLabels = [">=8 points", "6-8 points", "4-6 points", "<4 points"];
          const subjectDatasets = subjectLabels.map((label, index) => ({
            label,
            data: subjects.map(subject => data.subjects[subject] ? Object.values(data.subjects[subject])[index] : 0),
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ][index]
          }));

          setSubjectChartData({
            labels: subjects.map(subject => subject.charAt(0).toUpperCase() + subject.slice(1).replace('_', ' ')),
            datasets: subjectDatasets
          });

          const languageDataArray = Object.keys(data.foreign_language).map((code) => {
            const languageData = data.foreign_language[code];
            return {
              label: languageMap[code] || code,
              data: [
                languageData.above_8,
                languageData.between_6_and_8,
                languageData.between_4_and_6,
                languageData.below_4
              ],
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ]
            };
          });

          setLanguageChartData(languageDataArray);
          setError("");
        }
      } catch (error) {
        if (isMounted) {
          setError("An error occurred while fetching data.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card">
      <h2>Score Distribution by Subject</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <div className="bar-chart-container">
            <h3>Main Subjects</h3>
            <Bar
              data={subjectChartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Students'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Subjects'
                    }
                  }
                }
              }}
            />
          </div>

          <div className="language-charts">
            <h3>Foreign Languages</h3>
            <div className="doughnut-chart-grid">
              {languageChartData.map((language, index) => (
                <div key={index} className="doughnut-chart-container">
                  <h4>{language.label}</h4>
                  <Doughnut
                    data={{
                      labels: [">=8 points", "6-8 points", "4-6 points", "<4 points"],
                      datasets: [{
                        data: language.data,
                        backgroundColor: language.backgroundColor
                      }]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top'
                        },
                        tooltip: {
                          callbacks: {
                            label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`
                          }
                        }
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
