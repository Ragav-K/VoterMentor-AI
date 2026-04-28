/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home,
  ArrowLeft,
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  ArrowRight, 
  User, 
  MapPin, 
  Calendar, 
  Info, 
  MessageSquare, 
  X,
  RefreshCw,
  Trophy,
  Globe,
  Search,
  ChevronDown
} from 'lucide-react';
import { GlossaryText } from './components/GlossaryText.tsx';
import { UserLevel, ElectionStep, UserProgress, Message, SupportedLanguage } from './types.ts';
import { ELECTION_STEPS, STEP_CONTENT, QUIZ_DATA } from './constants.ts';
import { askElectionBot } from './lib/gemini.ts';
import { TRANSLATIONS } from './translations.ts';

const LANGUAGES: { code: SupportedLanguage; name: string }[] = [
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Español' },
  { code: 'FR', name: 'Français' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'IT', name: 'Italiano' },
  { code: 'PT', name: 'Português' },
  { code: 'JA', name: '日本語' },
  { code: 'RU', name: 'Русский' },
];

export default function App() {
  const [progress, setProgress] = useState<UserProgress>({
    level: null,
    currentStep: ElectionStep.ELIGIBILITY,
    completedSteps: [],
    country: '',
    age: null,
    isFirstTime: null,
    language: 'EN',
  });

  const t = TRANSLATIONS[progress.language as SupportedLanguage] || TRANSLATIONS.EN;

  const [stepIndex, setStepIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const [quizQuestIndex, setQuizQuestIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleLanguageSelect = (code: SupportedLanguage) => {
    setProgress({ ...progress, language: code });
    setLangMenuOpen(false);
    setLangSearch('');
    const nextT = TRANSLATIONS[code] || TRANSLATIONS.EN;
    setChatHistory([...chatHistory, { role: 'model', text: nextT.main.langNotice }]);
  };

  const startScenario = () => {
    setChatOpen(true);
    setChatHistory([...chatHistory, { role: 'user', text: "Simulate my voting journey" }]);
    handleSimulationRequest();
  };

  const handleSimulationRequest = async () => {
    setIsTyping(true);
    try {
      const response = await askElectionBot("Start a scenario simulation. Walk me through a hypothetical voting day experience.", progress.level!, chatHistory, progress.language);
      setChatHistory(prev => [...prev, { role: 'model', text: response || t.main.errorSim }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'model', text: t.main.errorDown }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePrevStep = () => {
    const prevIdx = stepIndex - 1;
    setQuizVisible(false);
    setQuizQuestIndex(0);
    setSelectedAnswer(null);
    setQuizFeedback(null);
    if (prevIdx >= 0) {
      setProgress({
        ...progress,
        currentStep: ELECTION_STEPS[prevIdx],
      });
      setStepIndex(prevIdx);
    }
  };

  const handleLevelSelect = (level: UserLevel) => {
    setProgress({ ...progress, level });
  };

  const handleOnboardingBack = () => {
    setProgress({ ...progress, level: null as any });
  };

  const handleOnboardingNext = (data: Partial<UserProgress>) => {
    setProgress({ ...progress, ...data });
  };

  const handleNextStep = () => {
    const nextIdx = stepIndex + 1;
    setQuizVisible(false);
    setQuizQuestIndex(0);
    setSelectedAnswer(null);
    setQuizFeedback(null);
    if (nextIdx < ELECTION_STEPS.length) {
      setProgress({
        ...progress,
        currentStep: ELECTION_STEPS[nextIdx],
        completedSteps: Array.from(new Set([...progress.completedSteps, progress.currentStep])),
      });
      setStepIndex(nextIdx);
    } else {
      setProgress({
        ...progress,
        completedSteps: Array.from(new Set([...progress.completedSteps, progress.currentStep])),
      });
    }
  };

  const handleQuizAnswer = (idx: number) => {
    const questions = QUIZ_DATA[progress.currentStep];
    const quiz = questions[quizQuestIndex];
    setSelectedAnswer(idx);
    if (idx === quiz.correctIndex) {
      setQuizFeedback(`✔️ ${t.main.quizCorrect} ${quiz.explanation}`);
    } else {
      setQuizFeedback(`❌ ${t.main.quizIncorrect} ${quiz.explanation}`);
    }
  };

  const handleNextQuizQuestion = () => {
    const questions = QUIZ_DATA[progress.currentStep];
    if (quizQuestIndex + 1 < questions.length) {
      setQuizQuestIndex(quizQuestIndex + 1);
      setSelectedAnswer(null);
      setQuizFeedback(null);
    } else {
      setQuizVisible(false);
      setQuizQuestIndex(0);
      setSelectedAnswer(null);
      setQuizFeedback(null);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || !progress.level) return;

    const newMsg: Message = { role: 'user', text: userInput };
    setChatHistory([...chatHistory, newMsg]);
    setUserInput('');
    setIsTyping(true);

    try {
      const response = await askElectionBot(userInput, progress.level, chatHistory, progress.language);
      setChatHistory(prev => [...prev, { role: 'model', text: response || t.main.errorNoAnswer }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'model', text: t.main.errorConnect }]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetAll = () => {
    setProgress({
      level: null,
      currentStep: ElectionStep.ELIGIBILITY,
      completedSteps: [],
      country: '',
      age: null,
      isFirstTime: null,
      language: 'EN',
    });
    setStepIndex(0);
    setChatHistory([]);
    setQuizVisible(false);
  };

  const currentStepData = STEP_CONTENT[progress.currentStep];
  const progressPercent = Math.round((progress.completedSteps.length / ELECTION_STEPS.length) * 100);

  const renderHeader = () => {
    const isMain = progress.level && progress.country !== '' && progress.isFirstTime !== null;
    const isOnboarding = progress.level && !isMain;
    
    if (!progress.level) return null;

    return (
      <header className="flex justify-between items-center px-6 md:px-10 py-6 border-b border-natural-primary/10 bg-natural-bg sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={isOnboarding ? handleOnboardingBack : (stepIndex > 0 ? handlePrevStep : handleOnboardingBack)}
            className="p-2 -ml-2 hover:bg-natural-secondary rounded-full transition-colors text-natural-primary mr-2"
            title={t.main.back}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 bg-natural-primary rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-natural-primary/20">
            <span className="text-xl">🧠</span>
          </div>
          <h1 className="text-2xl font-display italic text-natural-primary font-bold hidden sm:block">Civis: Election Guide</h1>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          {isMain && (
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wider text-natural-primary/60 font-bold">{t.main.journeyProgress}</span>
              <div className="flex items-center gap-3">
                <div className="w-32 lg:w-48 h-1.5 bg-natural-secondary rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full bg-natural-primary"
                  />
                </div>
                <span className="text-xs font-mono font-bold text-natural-primary">{progressPercent}%</span>
              </div>
            </div>
          )}
          
          {/* Searchable Language Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 bg-natural-primary text-white pl-4 pr-3 py-2 rounded-full text-[10px] font-bold uppercase hover:opacity-90 transition-all shadow-md shadow-natural-primary/20"
            >
              <Globe size={14} className="opacity-80" />
              <span>{progress.language}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <>
                  {/* Backdrop for closing */}
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-64 bg-white border border-natural-primary/10 rounded-[24px] shadow-2xl p-4 z-40 overflow-hidden"
                  >
                    <div className="relative mb-3">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-natural-primary/40" />
                      <input 
                        type="text"
                        placeholder="Search language..."
                        autoFocus
                        value={langSearch}
                        onChange={(e) => setLangSearch(e.target.value)}
                        className="w-full bg-natural-secondary/50 border-none rounded-xl py-2 pl-9 pr-3 text-xs font-medium focus:ring-1 focus:ring-natural-primary/20 outline-none"
                      />
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto space-y-1 custom-scrollbar">
                      {LANGUAGES.filter(lang => 
                        lang.name.toLowerCase().includes(langSearch.toLowerCase()) || 
                        lang.code.toLowerCase().includes(langSearch.toLowerCase())
                      ).map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors text-xs font-bold ${
                            progress.language === lang.code 
                              ? 'bg-natural-primary text-white' 
                              : 'hover:bg-natural-secondary text-natural-primary/70 hover:text-natural-primary'
                          }`}
                        >
                          <span>{lang.name}</span>
                          <span className="text-[10px] opacity-60 uppercase">{lang.code}</span>
                        </button>
                      ))}
                      {LANGUAGES.filter(lang => 
                        lang.name.toLowerCase().includes(langSearch.toLowerCase()) || 
                        lang.code.toLowerCase().includes(langSearch.toLowerCase())
                      ).length === 0 && (
                        <div className="py-8 text-center text-xs text-natural-primary/40 font-medium italic">
                          No languages found...
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={resetAll}
            className="p-2 hover:bg-natural-secondary rounded-full transition-colors text-natural-primary"
            title="Home"
          >
            <Home size={20} />
          </button>
        </div>
      </header>
    );
  };

  if (!progress.level) {
    return <WelcomeScreen language={progress.language as SupportedLanguage} onSelect={handleLevelSelect} />;
  }

  const isMainScreen = progress.country !== '' && progress.isFirstTime !== null;

  return (
    <div className="min-h-screen bg-natural-bg text-[#1A1A1A] font-sans flex flex-col">
      {renderHeader()}

      {!isMainScreen ? (
        <OnboardingScreen language={progress.language as SupportedLanguage} onNext={handleOnboardingNext} onBack={handleOnboardingBack} />
      ) : (
        <main className="flex-1 flex flex-col lg:flex-row gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Left Sidebar: Steps */}
        <aside className="w-full lg:w-72 flex flex-col gap-6">
          <div className="bg-natural-secondary rounded-[32px] p-6 flex flex-col gap-5 border border-natural-primary/5">
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-natural-primary/60 border-b border-natural-primary/10 pb-3">{t.main.stepsJourney}</h2>
            <nav className="flex flex-col gap-4">
              {ELECTION_STEPS.map((step, idx) => {
                const isCompleted = progress.completedSteps.includes(step);
                const isCurrent = progress.currentStep === step;
                return (
                  <div 
                    key={step} 
                    className={`flex items-center gap-4 transition-all ${isCurrent ? 'text-natural-primary' : isCompleted ? 'text-natural-primary/70' : 'opacity-40'}`}
                  >
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${isCurrent || isCompleted ? 'border-natural-primary bg-natural-primary text-white' : 'border-natural-primary/30'}`}>
                      {isCompleted ? <CheckCircle2 size={12} /> : idx + 1}
                    </div>
                    <span className={`text-sm ${isCurrent ? 'font-bold' : 'font-medium'}`}>{STEP_CONTENT[step].title.split(': ')[1]}</span>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="bg-[#F1E9E0] rounded-[24px] p-6 border border-natural-primary/10">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-natural-primary/60 mb-2">{t.main.microLesson}</h3>
            {quizVisible ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[8px] font-bold text-natural-accent uppercase tracking-tighter">
                    {t.main.questionCount.replace('{current}', (quizQuestIndex + 1).toString()).replace('{total}', QUIZ_DATA[progress.currentStep].length.toString())}
                  </span>
                </div>
                <p className="text-xs font-bold text-natural-primary">{QUIZ_DATA[progress.currentStep][quizQuestIndex].question}</p>
                <div className="grid gap-2">
                  {QUIZ_DATA[progress.currentStep][quizQuestIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={`text-[10px] text-left p-2 rounded-lg border border-natural-primary/10 transition-all ${
                        selectedAnswer === idx 
                          ? (idx === QUIZ_DATA[progress.currentStep][quizQuestIndex].correctIndex ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500')
                          : 'bg-white hover:bg-natural-bg'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {quizFeedback && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] leading-tight font-medium text-natural-primary/70">
                    <GlossaryText text={quizFeedback} language={progress.language} />
                  </motion.p>
                )}
                {selectedAnswer !== null && (
                  <div className="flex justify-between items-center mt-2">
                    <button 
                      onClick={() => { setQuizVisible(false); setSelectedAnswer(null); setQuizFeedback(null); setQuizQuestIndex(0); }}
                      className="text-[9px] font-bold uppercase text-natural-primary/40 hover:text-natural-primary transition-colors"
                    >
                      {t.main.closeQuiz}
                    </button>
                    <button 
                      onClick={handleNextQuizQuestion}
                      className="bg-natural-primary text-white text-[9px] font-bold uppercase px-3 py-1.5 rounded-full hover:opacity-90 transition-all"
                    >
                      {quizQuestIndex + 1 < QUIZ_DATA[progress.currentStep].length ? t.main.nextQuestion : t.main.finishQuiz}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <p className="text-xs leading-relaxed text-natural-primary/80 mb-4 font-medium italic">
                  "<GlossaryText text={currentStepData.lesson.fact} language={progress.language} />"
                </p>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setQuizVisible(true)}
                    className="text-[10px] uppercase font-bold text-natural-primary underline underline-offset-4 hover:opacity-70 transition-opacity text-left"
                  >
                    {t.main.startQuiz}
                  </button>
                  <p className="text-[9px] text-natural-primary/50 mt-1">
                    <span className="font-bold">{t.main.nextAction}:</span> {currentStepData.lesson.actionPrompt}
                  </p>
                </div>
              </>
            )}
          </div>
        </aside>

        {/* Center: Main Content */}
        <section className="flex-1 bg-white rounded-[40px] shadow-xl shadow-natural-primary/5 border border-natural-secondary p-8 md:p-12 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div 
              key={progress.currentStep}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="flex-1"
            >
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-natural-bg text-natural-primary text-[10px] font-bold rounded-full mb-5 uppercase tracking-tighter border border-natural-primary/10">
                  {currentStepData.title}
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-[1.1] text-natural-primary">
                  Let's verify if you're <span className="italic underline decoration-natural-accent/30 lowercase">{t.main.readyToVote}</span>.
                </h2>
                <p className="text-lg text-natural-primary/70 mb-10 max-w-xl leading-relaxed">
                  {currentStepData.description}
                </p>

                <div className="bg-natural-bg/50 rounded-[32px] p-8 border border-natural-secondary mb-10">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-natural-primary/10 rounded-xl flex items-center justify-center text-natural-primary shrink-0">
                      <HelpCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xl mb-1 text-natural-primary">{t.main.startQuiz}</h4>
                      <p className="text-sm text-natural-primary/50 mb-4 transition-colors">Test memory on {currentStepData.title.split(': ')[1]}</p>
                      <button 
                        onClick={() => {
                          setQuizVisible(true);
                          // Scroll to quiz on mobile
                          if (window.innerWidth < 1024) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="px-6 py-2 bg-natural-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2"
                      >
                        <HelpCircle size={14} /> {t.main.startQuiz}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-natural-bg/50 rounded-[32px] p-8 border border-natural-secondary mb-10">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-natural-primary/10 rounded-xl flex items-center justify-center text-natural-primary shrink-0">
                      <Info size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xl mb-3 text-natural-primary">{t.main.whatToKnow}</h4>
                      <p className="leading-relaxed text-natural-primary/80 text-lg">
                        <GlossaryText 
                          text={
                            progress.level === UserLevel.BEGINNER ? currentStepData.beginnerInfo :
                            progress.level === UserLevel.INTERMEDIATE ? currentStepData.intermediateInfo :
                            currentStepData.advancedInfo
                          } 
                          language={progress.language} 
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-natural-secondary pt-10 flex flex-col md:flex-row items-center justify-between gap-6 mt-auto">
                <div className="flex gap-4 w-full md:w-auto">
                  {stepIndex > 0 && (
                    <button 
                      onClick={handlePrevStep}
                      className="px-6 py-4 rounded-full border border-natural-primary/20 text-natural-primary/60 font-bold text-sm hover:bg-natural-bg transition-all flex items-center gap-2"
                    >
                      <ArrowLeft size={18} /> {t.main.back}
                    </button>
                  )}
                  <button 
                    onClick={() => setChatOpen(true)}
                    className="flex-1 md:flex-none px-8 py-4 rounded-full border border-natural-primary text-natural-primary font-bold text-sm hover:bg-natural-bg transition-all"
                  >
                    {t.main.quickQuestion}
                  </button>
                  <button 
                    onClick={handleNextStep}
                    className="flex-1 md:flex-none px-10 py-4 rounded-full bg-natural-primary text-white font-bold text-sm shadow-lg shadow-natural-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    {t.main.continue} <ArrowRight size={18} />
                  </button>
                </div>
                <p className="text-xs text-natural-primary/50 italic font-display text-center md:text-right">
                  "{t.main.quote}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Right Sidebar: Quick Insight */}
        <aside className="w-full lg:w-72 flex flex-col gap-6">
          <div className="bg-natural-primary text-natural-bg rounded-[32px] p-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h3 className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-5">{t.main.aiAssistant}</h3>
              <p className="text-2xl font-display font-bold mb-4 leading-tight">{t.main.aiSubtitle}</p>
              <p className="text-sm opacity-80 leading-relaxed mb-6 font-medium">
                {t.main.aiDesc}
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => setChatOpen(true)}
                  className="w-full py-4 bg-white/10 rounded-2xl text-xs font-bold uppercase border border-white/20 hover:bg-white/20 transition-all"
                >
                  {t.main.openChat}
                </button>
                <button 
                  onClick={startScenario}
                  className="w-full py-3 bg-natural-accent/20 rounded-2xl text-[10px] font-bold uppercase border border-natural-accent/30 hover:bg-natural-accent/30 transition-all text-natural-accent"
                >
                  🚀 {t.main.simulateJourney}
                </button>
              </div>
            </div>
            {/* Decorative circle */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-white border border-natural-secondary shadow-sm">
              <span className="text-[10px] font-bold text-natural-accent uppercase tracking-wider block mb-2">Timeline Insight</span>
              <p className="text-sm italic text-natural-primary/80">Registration windows usually close several weeks before Election Day. Don't wait!</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-natural-secondary shadow-sm">
              <span className="text-[10px] font-bold text-natural-primary uppercase tracking-wider block mb-2">Did you know?</span>
              <p className="text-sm text-natural-primary/70">In many countries, employers must legally provide paid time off for workers to cast their votes.</p>
            </div>
          </div>
        </aside>
      </main>
    )}

    {/* Floating Chat UI */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-white border border-natural-secondary rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-6 bg-natural-primary text-natural-bg flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-natural-bg/10 rounded-full flex items-center justify-center text-white">
                  <MessageSquare size={16} />
                </div>
                <h5 className="font-display font-bold text-lg">Smart Q&A</h5>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:bg-white/10 p-2 rounded-xl">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {chatHistory.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 bg-natural-bg rounded-3xl flex items-center justify-center text-natural-primary mb-5 shadow-inner">
                    <HelpCircle size={32} />
                  </div>
                  <p className="text-sm text-natural-primary/50 font-medium">{t.main.chatPlaceholder}</p>
                </div>
              ) : (
                chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-3xl text-sm ${
                      msg.role === 'user' 
                      ? 'bg-natural-primary text-white rounded-tr-none shadow-lg shadow-natural-primary/10' 
                      : 'bg-natural-secondary text-natural-primary rounded-tl-none font-medium'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-natural-secondary text-natural-primary/50 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest animate-pulse">
                    {t.main.thinking}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 border-t border-natural-secondary bg-natural-bg/30">
              <div className="flex gap-3 bg-white p-2 rounded-2xl border border-natural-secondary shadow-sm">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.main.typeQuestion}
                  className="flex-1 px-3 py-2 outline-none text-sm placeholder:text-natural-primary/30"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isTyping}
                  className="bg-natural-primary text-white p-3 rounded-xl hover:opacity-90 disabled:opacity-50"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WelcomeScreen({ language, onSelect }: { language: SupportedLanguage, onSelect: (level: UserLevel) => void }) {
  const t = TRANSLATIONS[language]?.welcome || TRANSLATIONS.EN.welcome;
  return (
    <div className="min-h-screen bg-natural-bg flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="w-16 h-16 bg-natural-primary rounded-3xl flex items-center justify-center text-white font-bold text-2xl italic mb-8 mx-auto lg:mx-0 shadow-2xl shadow-natural-primary/20">C</div>
            <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight text-natural-primary leading-[0.95] mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-natural-primary/60 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-[450px] bg-white border border-natural-secondary rounded-[48px] p-10 shadow-2xl shadow-natural-primary/10"
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-natural-primary/40 mb-8">{t.familiarity}</h2>
            <div className="space-y-4">
              {[
                { level: UserLevel.BEGINNER, label: t.beginner, desc: t.beginnerDesc },
                { level: UserLevel.INTERMEDIATE, label: t.intermediate, desc: t.intermediateDesc },
                { level: UserLevel.ADVANCED, label: t.advanced, desc: t.advancedDesc },
              ].map((item) => (
                <button
                  key={item.level}
                  onClick={() => onSelect(item.level)}
                  className={`w-full p-6 text-left rounded-[32px] border bg-natural-bg border-natural-primary/10 transition-all hover:bg-natural-primary hover:text-white group flex items-center justify-between`}
                >
                  <div>
                    <h3 className={`font-display font-bold text-2xl text-natural-primary group-hover:text-white tracking-tight`}>{item.label}</h3>
                    <p className={`text-xs opacity-60 font-medium uppercase tracking-widest mt-1 group-hover:text-white/70`}>
                      {item.desc}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-natural-primary/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function OnboardingScreen({ language, onNext, onBack }: { language: SupportedLanguage, onNext: (data: Partial<UserProgress>) => void, onBack: () => void }) {
  const t = TRANSLATIONS[language]?.onboarding || TRANSLATIONS.EN.onboarding;
  const [country, setCountry] = useState('United States');
  const [age, setAge] = useState<number>(18);
  const [firstTime, setFirstTime] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-natural-bg flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white border border-natural-secondary rounded-[48px] p-10 md:p-14 shadow-2xl shadow-natural-primary/10"
      >
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-natural-primary/30 block">{t.profile}</span>
          <button 
            onClick={onBack}
            className="text-natural-primary/40 hover:text-natural-primary transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={14} /> {t.back}
          </button>
        </div>
        <h2 className="text-4xl font-display font-bold text-natural-primary mb-10">{t.title}</h2>
        
        <div className="space-y-10">
          <div>
            <label className="block text-[10px] uppercase font-bold text-natural-primary/50 tracking-widest mb-4 flex items-center gap-2">
              <MapPin size={14} className="text-natural-accent" /> {t.country}
            </label>
            <input 
              type="text" 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-natural-bg border border-natural-primary/5 rounded-[24px] px-8 py-5 outline-none focus:ring-2 focus:ring-natural-primary/20 text-lg font-medium text-natural-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] uppercase font-bold text-natural-primary/50 tracking-widest mb-4 flex items-center gap-2">
                <Calendar size={14} className="text-natural-accent" /> {t.age}
              </label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full bg-natural-bg border border-natural-primary/5 rounded-[24px] px-8 py-5 outline-none focus:ring-2 focus:ring-natural-primary/20 text-lg font-medium text-natural-primary"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-natural-primary/50 tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-natural-accent" /> {t.isFirstTime}
              </label>
              <div className="flex bg-natural-bg p-1.5 rounded-[24px] border border-natural-primary/5">
                <button 
                  onClick={() => setFirstTime(true)}
                  className={`flex-1 py-4 text-sm font-bold rounded-[18px] transition-all ${firstTime ? 'bg-natural-primary text-white shadow-xl' : 'text-natural-primary/40'}`}
                >
                  {t.yes}
                </button>
                <button 
                  onClick={() => setFirstTime(false)}
                  className={`flex-1 py-4 text-sm font-bold rounded-[18px] transition-all ${!firstTime ? 'bg-natural-primary text-white shadow-xl' : 'text-natural-primary/40'}`}
                >
                  {t.no}
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNext({ country, age, isFirstTime: firstTime })}
            className="w-full bg-natural-primary text-white py-6 rounded-[32px] font-bold text-lg hover:opacity-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-natural-primary/20"
          >
            {t.start} <ArrowRight size={22} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

