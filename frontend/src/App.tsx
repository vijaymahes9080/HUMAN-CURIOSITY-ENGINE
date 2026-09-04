import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  UnaskedQuestion, 
  BlindspotNode, 
  BlindspotLink, 
  FutureHorizonAnalysis, 
  ResearchDomainReport,
  AIProviderConfig,
  CuriosityProfileStats
} from './types';
import { curiosityEngine } from './services/curiosityEngine';
import { apiService } from './services/api';
import { soundManager } from './services/sound';

// Components
import { NeuralCanvas } from './components/common/NeuralCanvas';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SettingsModal } from './components/common/SettingsModal';
import { ChallengeModal } from './components/challenge/ChallengeModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DiscoveryPage } from './pages/DiscoveryPage';
import { ResultsPage } from './pages/ResultsPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { BlindspotMapPage } from './pages/BlindspotMapPage';
import { FutureExplorerPage } from './pages/FutureExplorerPage';
import { ResearchModePage } from './pages/ResearchModePage';
import { StartupModePage } from './pages/StartupModePage';
import { CommunityUniversePage } from './pages/CommunityUniversePage';
import { DashboardPage } from './pages/DashboardPage';

export const App: React.FC = () => {
  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('landing');
  const [activeTopic, setActiveTopic] = useState<string>('Artificial Intelligence & Cognitive Scaling');
  const [isDiscovering, setIsDiscovering] = useState<boolean>(false);

  // Discovery Data State
  const [questions, setQuestions] = useState<UnaskedQuestion[]>([]);
  const [graphNodes, setGraphNodes] = useState<BlindspotNode[]>([]);
  const [graphLinks, setGraphLinks] = useState<BlindspotLink[]>([]);
  const [futureHorizons, setFutureHorizons] = useState<FutureHorizonAnalysis[]>([]);
  const [researchReport, setResearchReport] = useState<ResearchDomainReport | null>(null);

  // Active Selected Question for Explorer & Challenge
  const [selectedQuestion, setSelectedQuestion] = useState<UnaskedQuestion | null>(null);
  const [challengeTargetQuestion, setChallengeTargetQuestion] = useState<UnaskedQuestion | null>(null);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  // App Settings & Preferences
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [aiConfig, setAiConfig] = useState<AIProviderConfig>(() => apiService.getAIConfig());

  // User Stats & Persistence
  const [totalDiscoveredCount, setTotalDiscoveredCount] = useState<number>(127);

  // Initialize initial default dataset on mount
  useEffect(() => {
    const initialData = curiosityEngine.generateDiscovery('Artificial Intelligence');
    setQuestions(initialData.questions);
    setGraphNodes(initialData.graphNodes);
    setGraphLinks(initialData.graphLinks);
    setFutureHorizons(initialData.futureHorizons);
    setResearchReport(initialData.researchReport);
    setSelectedQuestion(initialData.questions[0]);
  }, []);

  // Handler: Start New Discovery
  const handleStartDiscovery = async (topic: string) => {
    setActiveTopic(topic);
    setIsDiscovering(true);
    setCurrentTab('discovery');

    // Run discovery analysis
    const result = await apiService.analyzeTopic(topic);
    setQuestions(result.questions);
    setGraphNodes(result.graphNodes);
    setGraphLinks(result.graphLinks);
    setFutureHorizons(result.futureHorizons);
    setResearchReport(result.researchReport);
    setSelectedQuestion(result.questions[0]);
    setTotalDiscoveredCount((prev) => prev + result.questions.length);
  };

  // Handler: Discovery Animation Complete
  const handleDiscoveryAnimationComplete = () => {
    setIsDiscovering(false);
    setCurrentTab('results');
  };

  // Handler: Deep Explore Question
  const handleExploreQuestion = (question: UnaskedQuestion) => {
    setSelectedQuestion(question);
    setCurrentTab('explorer');
  };

  // Handler: Challenge Question
  const handleOpenChallenge = (question: UnaskedQuestion) => {
    setChallengeTargetQuestion(question);
    setIsChallengeModalOpen(true);
  };

  // Handler: Apply Challenge Refinement
  const handleApplyChallenge = (
    target: UnaskedQuestion,
    type: 'importance' | 'already_discussed' | 'flawed_assumption' | 'contradictory_evidence' | 'custom',
    critique: string
  ) => {
    const refined = curiosityEngine.refineQuestionWithChallenge(target, type, critique);
    
    setQuestions((prev) => prev.map((q) => (q.id === target.id ? refined : q)));
    if (selectedQuestion?.id === target.id) {
      setSelectedQuestion(refined);
    }
  };

  // Handler: Save / Bookmark Question
  const handleToggleSave = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, is_saved: !q.is_saved } : q))
    );
    if (selectedQuestion?.id === questionId) {
      setSelectedQuestion((prev) => (prev ? { ...prev, is_saved: !prev.is_saved } : null));
    }
  };

  // Handler: Upvote Question
  const handleUpvote = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const alreadyVoted = q.user_voted;
          return {
            ...q,
            upvotes: alreadyVoted ? q.upvotes - 1 : q.upvotes + 1,
            user_voted: !alreadyVoted
          };
        }
        return q;
      })
    );
  };

  // Toggle Sound
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setEnabled(next);
  };

  // Toggle Theme
  const handleToggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
      return next;
    });
  };

  const savedQuestions = questions.filter((q) => q.is_saved);
  const userStats = apiService.getUserStats(savedQuestions.length, totalDiscoveredCount);

  return (
    <div className={`min-h-screen flex flex-col bg-[#07090E] text-slate-100 relative ${isDarkMode ? 'dark' : 'light'}`}>
      
      {/* Background Neural Canvas Constellation */}
      <NeuralCanvas />

      {/* Top Sticky Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onNewAnalysis={() => setCurrentTab('landing')}
        hasResults={questions.length > 0}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        aiConfig={aiConfig}
      />

      {/* Main Content Area Routing */}
      <main className="flex-1 relative z-10">
        {currentTab === 'landing' && (
          <LandingPage
            onStartDiscovery={handleStartDiscovery}
            isLoading={isDiscovering}
          />
        )}

        {currentTab === 'discovery' && (
          <DiscoveryPage
            topic={activeTopic}
            onComplete={handleDiscoveryAnimationComplete}
          />
        )}

        {currentTab === 'results' && (
          <ResultsPage
            topic={activeTopic}
            questions={questions}
            onExplore={handleExploreQuestion}
            onChallenge={handleOpenChallenge}
            onToggleSave={handleToggleSave}
            onUpvote={handleUpvote}
            onOpenBlindspotMap={() => setCurrentTab('blindspot_map')}
          />
        )}

        {currentTab === 'explorer' && selectedQuestion && (
          <ExplorerPage
            question={selectedQuestion}
            onBack={() => setCurrentTab('results')}
            onChallenge={handleOpenChallenge}
            onToggleSave={handleToggleSave}
            onSelectRelated={(relTitle) => handleStartDiscovery(relTitle)}
          />
        )}

        {currentTab === 'blindspot_map' && (
          <BlindspotMapPage
            topic={activeTopic}
            nodes={graphNodes}
            links={graphLinks}
            questions={questions}
            onSelectQuestion={handleExploreQuestion}
          />
        )}

        {currentTab === 'future_explorer' && (
          <FutureExplorerPage
            topic={activeTopic}
            horizons={futureHorizons}
          />
        )}

        {currentTab === 'research_mode' && researchReport && (
          <ResearchModePage
            topic={activeTopic}
            report={researchReport}
          />
        )}

        {currentTab === 'startup_mode' && (
          <StartupModePage
            topic={activeTopic}
            questions={questions}
            onSelectQuestion={handleExploreQuestion}
          />
        )}

        {currentTab === 'community' && (
          <CommunityUniversePage
            questions={questions}
            onExplore={handleExploreQuestion}
            onChallenge={handleOpenChallenge}
            onUpvote={handleUpvote}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            stats={userStats}
            savedQuestions={savedQuestions}
            onSelectQuestion={handleExploreQuestion}
            onExploreTopic={handleStartDiscovery}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        config={aiConfig}
        onSaveConfig={(newCfg) => {
          setAiConfig(newCfg);
          apiService.saveAIConfig(newCfg);
        }}
      />

      {/* Question Challenge Modal */}
      <ChallengeModal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
        question={challengeTargetQuestion}
        onApplyChallenge={handleApplyChallenge}
      />

    </div>
  );
};

export default App;
