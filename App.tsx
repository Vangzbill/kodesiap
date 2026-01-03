import React, { useState, useEffect } from 'react';
import {
  Menu, X, Moon, Sun, ChevronRight, BookOpen, Code2,
  Terminal, Search, Filter, CheckCircle2, ChevronDown
} from 'lucide-react';
import { TOPICS } from './constants';
import { Topic, Problem } from './types';
import CodeBlock from './components/CodeBlock';
import ProblemSolver from './components/ProblemSolver';
import * as Icons from 'lucide-react';

// Dynamically render Lucide icons based on string name
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : <BookOpen className={className} />;
};

function App() {
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | string>('home'); // 'home' or topicId
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Effects
  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    // Load progress
    const saved = localStorage.getItem('kodesiap-progress');
    if (saved) {
      const { topics, problems } = JSON.parse(saved);
      setCompletedTopics(topics || []);
      setSolvedProblems(problems || []);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('kodesiap-progress', JSON.stringify({
      topics: completedTopics,
      problems: solvedProblems
    }));
  }, [completedTopics, solvedProblems]);

  // Handlers
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSolveProblem = (problemId: string, topicId: string) => {
    if (!solvedProblems.includes(problemId)) {
      const newSolved = [...solvedProblems, problemId];
      setSolvedProblems(newSolved);

      // Check if topic is completed (all problems solved)
      const topic = TOPICS.find(t => t.id === topicId);
      if (topic) {
        const allSolved = topic.problems.every(p => newSolved.includes(p.id));
        if (allSolved && !completedTopics.includes(topicId)) {
          setCompletedTopics([...completedTopics, topicId]);
        }
      }
    }
  };

  const getFilteredTopics = () => {
    if (!searchQuery) return TOPICS;
    return TOPICS.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const activeTopic = TOPICS.find(t => t.id === currentView);

  // Components (Inline for simplicity in single file structure, but separated conceptually)

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-darkcard border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto lg:h-screen lg:overflow-y-auto`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white cursor-pointer" onClick={() => setCurrentView('home')}>
          <Terminal className="text-accent" />
          <span>KodeSiap</span>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500">
          <X size={24} />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Progress</div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 w-full overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-500"
              style={{ width: `${(completedTopics.length / TOPICS.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-right text-xs text-gray-500 mt-1">{completedTopics.length} / {TOPICS.length} Topik</div>
        </div>

        <nav className="space-y-1">
          {TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => { setCurrentView(topic.id); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${currentView === topic.id
                ? 'bg-accent/10 text-accent'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
            >
              <div className="flex items-center gap-3">
                <DynamicIcon name={topic.icon} className="w-4 h-4" />
                <span>{topic.title}</span>
              </div>
              {completedTopics.includes(topic.id) && <CheckCircle2 size={14} className="text-accent" />}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Kuasai <span className="text-accent">Technical Coding Test</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Platform interaktif lengkap dengan materi, template kode, dan latihan soal algoritma struktur data dalam Bahasa Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredTopics().map(topic => (
          <div
            key={topic.id}
            onClick={() => setCurrentView(topic.id)}
            className="group relative bg-white dark:bg-darkcard rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-accent dark:hover:border-accent shadow-sm hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
              <DynamicIcon name={topic.icon} className="w-24 h-24 text-accent" />
            </div>

            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${completedTopics.includes(topic.id) ? 'bg-green-100 text-green-600 dark:bg-green-900/20' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'} group-hover:bg-accent group-hover:text-white transition-colors`}>
                <DynamicIcon name={topic.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{topic.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{topic.description}</p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-xs font-mono text-gray-400">{topic.problems.length} Soal</span>
                <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Mulai Belajar <ChevronRight size={16} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TopicView = ({ topic }: { topic: Topic }) => (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={() => setCurrentView('home')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent mb-6 transition-colors"
      >
        <ChevronRight className="rotate-180" size={16} /> Kembali ke Beranda
      </button>

      {/* Header Judul Topik */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-accent/10 rounded-xl text-accent">
          <DynamicIcon name={topic.icon} className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{topic.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{topic.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">

        {/* Bagian Atas: Konsep & Template */}
        <div className="w-full">
          <div className="bg-white dark:bg-darkcard rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-accent" /> Konsep Dasar
            </h2>
            <div className="prose dark:prose-invert prose-sm max-w-none text-gray-600 dark:text-gray-300">
              {topic.concept.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-justify">{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Code2 size={16} className="text-purple-500" /> Code Pattern
              </h3>
              <CodeBlock code={topic.templateCode} title="Python Template" />
            </div>
          </div>
        </div>

        {/* Bagian Bawah: Daftar Soal */}
        <div className="w-full space-y-8">
          {topic.problems.map((problem, index) => (
            <div key={problem.id} id={problem.id} className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4 mt-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 font-bold text-gray-600 dark:text-gray-400 text-sm">
                  {index + 1}
                </span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Latihan: {problem.title}</h2>
              </div>
              <ProblemSolver
                problem={problem}
                onSolve={(id) => handleSolveProblem(id, topic.id)}
                isSolved={solvedProblems.includes(problem.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkbg text-gray-900 dark:text-gray-100 flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-darkcard border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <Menu size={24} />
            </button>
            <div className="lg:hidden font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Terminal size={20} className="text-accent" /> KodeSiap
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noreferrer"
              className="hidden md:block text-sm font-medium text-gray-500 hover:text-accent transition-colors"
            >
              Resources
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="w-8 h-8 bg-gradient-to-tr from-accent to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-accent/20">
              SN
            </div>
          </div>
        </header>

        {/* Main Content Scroll Area */}
        <main className="flex-1 overflow-y-auto scroll-smooth p-0 lg:p-4">
          {currentView === 'home' ? <HomeView /> : activeTopic ? <TopicView topic={activeTopic} /> : <div className="p-8 text-center">Topik tidak ditemukan</div>}

          <footer className="mt-12 py-8 text-center text-gray-500 text-sm border-t border-gray-200 dark:border-gray-800">
            <p>&copy; {new Date().getFullYear()} KodeSiap. Sabil with love.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;