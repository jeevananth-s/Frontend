import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Database, RefreshCw, Layers, Copy, CheckCircle2 } from 'lucide-react';
import { sqlLessons } from '../data/lessons';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for cleaner class merging
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const LessonCard = ({ lesson }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(lesson.example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6"
    >
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{lesson.title}</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-4">{lesson.definition}</p>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Syntax</h4>
          <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
            {lesson.syntax}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Example</h4>
            <button 
              onClick={handleCopy}
              className="text-slate-400 hover:text-blue-500 transition-colors flex items-center space-x-1 text-xs font-medium"
            >
              {copied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="bg-slate-800 dark:bg-slate-950 p-4 rounded-xl border border-slate-700 dark:border-slate-800 font-mono text-sm text-blue-300 whitespace-pre-wrap overflow-x-auto relative">
             {lesson.example}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-200 italic">
            <span className="font-semibold not-italic">Note:</span> {lesson.explanation}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const SQLLessons = () => {
  const [activeTab, setActiveTab] = useState('ddl');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'ddl', label: 'DDL', description: 'Data Definition Language', icon: Layers },
    { id: 'dml', label: 'DML', description: 'Data Manipulation Language', icon: RefreshCw },
    { id: 'dql', label: 'DQL', description: 'Data Query Language', icon: Database },
  ];

  const currentLessons = sqlLessons[activeTab] || [];
  
  const filteredLessons = currentLessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lesson.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            SQL Lessons
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Master database commands grouped by their SQL sub-languages.
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 overflow-hidden group",
                isActive 
                  ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105 z-10" 
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md"
              )}
            >
              <div className={cn(
                "p-3 rounded-full mb-3 transition-colors duration-300",
                isActive ? "bg-white/20" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50"
              )}>
                <Icon size={28} />
              </div>
              <h2 className="text-xl font-bold mb-1">{tab.label}</h2>
              <p className={cn("text-xs text-center font-medium", isActive ? "text-blue-100" : "text-slate-500 dark:text-slate-400")}>
                {tab.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="pt-4">
        <div className="mb-6 flex items-center space-x-2">
          <div className="h-6 w-1.5 bg-blue-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {tabs.find(t => t.id === activeTab)?.label} Commands
          </h2>
          <span className="text-sm bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium ml-2">
            {filteredLessons.length} lessons
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="col-span-full py-12 text-center"
              >
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                  <Search size={24} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-1">No lessons found</h3>
                <p className="text-slate-500 dark:text-slate-400">Try adjusting your search query.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SQLLessons;
