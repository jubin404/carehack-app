import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ChildProfiles } from './components/ChildProfiles';
import { Reports } from './components/Reports';
import { Resources } from './components/Resources';
import { AdminReports } from './components/AdminReports';

export default function App() {
  const [activeView, setActiveView] = useState('reports');
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedTestType, setSelectedTestType] = useState(null);
  const [userRole, setUserRole] = useState('parent'); // Can be changed for demo

  const handleViewChild = (childId) => {
    setSelectedChildId(childId);
    setActiveView('child-detail');
  };

  const handleBackToList = () => {
    setSelectedChildId(null);
    setActiveView('children');
  };

  const handleTakeTest = (childId, testType) => {
    setSelectedChildId(childId);
    setSelectedTestType(testType);
    setActiveView('test-taking');
  };

  const handleBackFromTest = () => {
    setSelectedTestType(null);
    setActiveView('child-detail');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'reports':
        return <Reports />;
      case 'children':
      case 'add-child':
        return (
          <ChildProfiles 
            onViewChild={handleViewChild}
            onBackToList={handleBackToList}
            selectedChildId={selectedChildId}
            onTakeTest={handleTakeTest}
          />
        );
      case 'child-detail':
        return (
          <ChildProfiles 
            onViewChild={handleViewChild}
            onBackToList={handleBackToList}
            selectedChildId={selectedChildId}
            onTakeTest={handleTakeTest}
          />
        );
      case 'admin-reports':
        return userRole !== 'parent' ? <AdminReports /> : <Dashboard onViewChild={handleViewChild} />;
      case 'resources':
        return <Resources />;
      default:
        return <Reports onViewChild={handleViewChild} />;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        userRole={userRole}
        selectedChildId={selectedChildId}
        isTestTaking={activeView === 'test-taking'}
        onBackFromTest={handleBackFromTest}
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}