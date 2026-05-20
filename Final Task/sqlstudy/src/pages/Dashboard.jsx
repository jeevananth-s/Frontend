import { motion } from 'framer-motion';
import { BookOpen, Trophy, Clock, ArrowRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-6"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-500 dark:text-slate-400 font-medium">{title}</h3>
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={20} />
      </div>
    </div>
    <div className="text-3xl font-bold text-slate-800 dark:text-white">{value}</div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();

  const recentLessons = [
    { id: 1, title: 'SELECT Statements', category: 'DQL', progress: 100 },
    { id: 2, title: 'CREATE TABLE', category: 'DDL', progress: 50 },
    { id: 3, title: 'INSERT INTO', category: 'DML', progress: 0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Track your progress and continue learning SQL.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Lessons Completed" 
          value="12/45" 
          icon={BookOpen} 
          colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          delay={0.1}
        />
        <StatCard 
          title="Current Streak" 
          value="3 Days" 
          icon={Trophy} 
          colorClass="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
          delay={0.2}
        />
        <StatCard 
          title="Study Time" 
          value="5h 20m" 
          icon={Clock} 
          colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Continue Learning</h2>
            <Link to="/lessons" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentLessons.map((lesson, index) => (
              <div key={lesson.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                      <Code2 size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white">{lesson.title}</h4>
                      <span className="text-xs font-medium px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                        {lesson.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{lesson.progress}%</span>
                </div>
                
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6 bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready for a challenge?</h2>
              <p className="text-blue-100 mb-6">
                Test your SQL knowledge with our interactive quiz. Earn points and climb the leaderboard!
              </p>
            </div>
            
            <Link 
              to="/quiz" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 hover:bg-slate-50 font-bold rounded-xl shadow-lg transition-colors w-max"
            >
              Start Quiz <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
