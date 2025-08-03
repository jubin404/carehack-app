import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { SignUp } from './components/Signup';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ChildProfiles } from './components/ChildProfiles';
import { Reports } from './components/Reports';
import { Resources } from './components/Resources';
import { AdminReports } from './components/AdminReports';
import { TestTaking } from './components/TestTaking';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedTestType, setSelectedTestType] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('educare_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('educare_user');
      }
    }
  }, []);

  const handleLogin = (email, name, role) => {
    const userData = {
      email,
      role: role,
      name:name
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('educare_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveView('dashboard');
    setSelectedChildId(null);
    setSelectedTestType(null);
    localStorage.removeItem('educare_user');
  };

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
      case 'children':
      case 'add-child':
        return (
          <ChildProfiles 
            onViewChild={handleViewChild}
            onBackToList={handleBackToList}
            selectedChildId={selectedChildId}
            onTakeTest={handleTakeTest}
            isAuthenticated={isAuthenticated}
            setSelectedChildId={setSelectedChildId}
          />
        );
      case 'child-detail':
        return (
          <ChildProfiles 
            onViewChild={handleViewChild}
            onBackToList={handleBackToList}
            selectedChildId={selectedChildId}
            onTakeTest={handleTakeTest}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'test-taking':
        return (
          <TestTaking
            childId={selectedChildId}
            testType={selectedTestType}
            onBackToProfile={handleBackFromTest}
          />
        );
      case 'reports':
        return <Reports isAuthenticated={isAuthenticated} />;
      case 'admin-reports':
        return user?.role !== 'parent' ? <AdminReports /> : <Dashboard onViewChild={handleViewChild} />;
      case 'resources':
        return <Resources />;
      default:
        return <Reports />;
    }
  };

  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    if (authView === 'login') {
      return (
        <Login 
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthView('signup')}
        />
      );
    } else {
      return (
        <SignUp 
          onSwitchToLogin={() => setAuthView('login')}
        />
      );
    }
  }

  // Show main application if authenticated
  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        userRole={user.role}
        selectedChildId={selectedChildId}
        isTestTaking={activeView === 'test-taking'}
        onBackFromTest={handleBackFromTest}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}