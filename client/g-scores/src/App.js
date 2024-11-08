import React, { useState, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';

const Report = React.lazy(() => import('./components/Report'));
const Top10 = React.lazy(() => import('./components/Top10'));

function App() {
  const [activeComponent, setActiveComponent] = useState('searchScores');

  const renderContent = () => {
    switch (activeComponent) {
      case 'searchScores':
        return <RegistrationForm />;
      case 'report':
        return (
          <Suspense fallback={<div>Loading Report...</div>}>
            <Report />
          </Suspense>
        );
      case 'top10GroupA':
        return (
          <Suspense fallback={<div>Loading Top 10...</div>}>
            <Top10 />
          </Suspense>
        );
      default:
        return <RegistrationForm />;
    }
  };

  return (
    <div>
      <Header />
      <div className="app">
        <Sidebar onSelect={setActiveComponent} />
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
