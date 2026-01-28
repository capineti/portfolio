import { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { AgentGridScreen } from './features/vendors/AgentGridScreen';
import { VendorAnalyticsScreen } from './features/vendors/VendorAnalyticsScreen';
import { AnalysisScreen } from './features/analysis/AnalysisScreen';
import { TeamAnalyticsScreen } from './features/vendors/TeamAnalyticsScreen'; // New Import
import { LoginScreen } from './features/auth/LoginScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('lxarch_auth') === 'true' ||
      sessionStorage.getItem('lxarch_session') === 'true';
  });

  const [currentView, setCurrentView] = useState('dashboard');
  const [previousView, setPreviousView] = useState(null); // Track where we came from
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null); // Track selected week
  const [selectedCall, setSelectedCall] = useState(null); // Track selected call
  const [initialTeamView, setInitialTeamView] = useState('months'); // Track initial view for Team Dashboard

  const handleLogin = (keepLoggedIn) => {
    setIsAuthenticated(true);
    if (keepLoggedIn) {
      localStorage.setItem('lxarch_auth', 'true');
    } else {
      sessionStorage.setItem('lxarch_session', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('lxarch_auth');
    sessionStorage.removeItem('lxarch_session');
  };

  // Step 1: Click Agent (Main Grid "Prioridades") -> Go directly to Analysis Detail (Specific Call)
  const handleAgentSelect = (agent) => {
    // Construct a mock call object since the Priorities list represents specific calls
    const mockCall = {
      id: 999, // Dummy ID
      client: 'Cliente (Prioridad)',
      date: agent.nextFollowUp || 'Hoy',
      status: agent.status,
      score: agent.progress,
      nextMeeting: agent.nextFollowUp
    };

    setSelectedAgent(agent);
    setSelectedCall(mockCall);
    setPreviousView('dashboard');
    setCurrentView('analysis_detail');
  };

  // Click Agent (Team Dashboard) -> Go to Vendor Dashboard (with specific week context)
  const handleTeamMemberSelect = (agent, week) => {
    setSelectedAgent(agent);
    setSelectedWeek(week);
    setPreviousView('team_dashboard');
    setCurrentView('vendor_dashboard');
  }

  // Step 2: Click Call -> Go to Analysis Detail
  const handleCallSelect = (call) => {
    console.log("Selected call:", call);
    setSelectedCall(call);
    setPreviousView('vendor_dashboard');
    setCurrentView('analysis_detail');
  };

  // Back from Analysis -> Return to previous view
  const handleBackFromAnalysis = () => {
    setSelectedCall(null);
    if (previousView === 'dashboard') {
      setSelectedAgent(null);
      setCurrentView('dashboard');
    } else if (previousView === 'vendor_dashboard') {
      setCurrentView('vendor_dashboard');
    } else {
      setCurrentView('dashboard'); // Fallback
    }
  };

  // Back from Vendor Dashboard -> Return to Team Dashboard or Main Grid
  const handleBackFromVendor = (targetMode) => {
    const mode = typeof targetMode === 'string' ? targetMode : 'weeks';

    // Explicit navigation: Go to Main Dashboard
    if (mode === 'dashboard') {
      setSelectedAgent(null);
      setCurrentView('dashboard');
      return;
    }

    // Explicit navigation request to specific Team Dashboard views
    if (mode === 'current_week' || mode === 'months' || mode === 'weeks') {
      if (mode === 'current_week') {
        // If restoring session/reload, ensure a week is set (Default to Week 4)
        if (!selectedWeek) {
          setSelectedWeek({ id: 4, label: 'Semana 4', isCurrent: true });
        }
      } else {
        setSelectedWeek(null);
        setInitialTeamView(mode);
      }
      setCurrentView('team_dashboard');
      return;
    }

    // Fallback based on history
    if (previousView === 'team_dashboard') {
      setSelectedAgent(null);
      setSelectedWeek(null);
      setInitialTeamView(mode);
      setCurrentView('team_dashboard');
    } else {
      setSelectedAgent(null);
      setCurrentView('dashboard');
    }
  };

  // Go to History -> Team Dashboard
  const handleViewHistory = (mode = 'months') => {
    setSelectedAgent(null);
    setSelectedCall(null);
    setSelectedWeek(null);
    setInitialTeamView(mode); // Store preference
    setPreviousView('dashboard');
    setCurrentView('team_dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AgentGridScreen onAgentSelect={handleAgentSelect} onViewHistory={handleViewHistory} />;
      case 'team_dashboard':
        return (
          <TeamAnalyticsScreen
            key={initialTeamView}
            onBack={() => setCurrentView('dashboard')}
            onAgentSelect={handleTeamMemberSelect}
            initialWeek={selectedWeek}
            initialViewMode={initialTeamView}
          />
        );
      case 'vendor_dashboard':
        return (
          <VendorAnalyticsScreen
            agent={selectedAgent}
            initialWeek={selectedWeek}
            onBack={handleBackFromVendor}
            onSelectCall={handleCallSelect}
          />
        );
      case 'analysis_detail':
        return (
          <AnalysisScreen
            agent={selectedAgent}
            call={selectedCall}
            onBack={handleBackFromAnalysis}
          />
        );
      case 'settings':
        return <div className="p-10">
          <h2 className="text-xl mb-4">Configuración</h2>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-100 text-red-600 rounded">
            Cerrar Sesión
          </button>
        </div>;
      default:
        return <AgentGridScreen onAgentSelect={handleAgentSelect} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <MainLayout
      currentView={currentView}
      onNavigate={(view) => {
        // Reset detailed view if navigating via sidebar
        if (view === 'dashboard') {
          setSelectedAgent(null);
          setSelectedCall(null);
        }
        setCurrentView(view);
      }}
      onLogout={handleLogout}
    >
      {renderContent()}
    </MainLayout>
  );
}

export default App;
