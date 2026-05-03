import React, { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import PracticeBallot from './components/PracticeBallot';
import CivicScore from './components/CivicScore';
import AssistantOrb from './components/AssistantOrb';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [scenario, setScenario] = useState(null);
  const [score, setScore] = useState(150);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLightMode);
  }, [isLightMode]);

  const handleVote = () => setScore(prev => prev + 50);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', position: 'relative' }}>
      <button 
        onClick={() => setIsLightMode(!isLightMode)}
        style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-primary)' }}
        className="liquid-glass"
      >
        {isLightMode ? <Moon size={24} /> : <Sun size={24} />}
      </button>

      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '3.5rem', fontWeight: 700, background: 'linear-gradient(135deg, var(--title-gradient-1), var(--title-gradient-2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}
        >
          VoteSure
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}
        >
          Your personalized guide to the election process.
        </motion.p>
      </header>

      <AnimatePresence mode="wait">
        {!scenario ? (
          <motion.div 
            key="onboarding"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}
          >
            {[
              { id: 'first-time', title: 'First-Time Voter', icon: '🗳️' },
              { id: 'relocator', title: 'Recently Moved', icon: '🚚' },
              { id: 'real-time', title: 'Upcoming Election Info', icon: '📅' }
            ].map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScenario(item.id)}
                className="liquid-glass"
                style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}
              >
                <span style={{ fontSize: '3rem' }}>{item.icon}</span>
                <h3 style={{ fontSize: '1.25rem' }}>{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <button 
              onClick={() => setScenario(null)}
              style={{ color: 'var(--text-secondary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              ← Back to Scenarios
            </button>

            {scenario === 'first-time' && (
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Your Registration Path</h2>
                <Timeline />
              </div>
            )}

            {scenario === 'relocator' && (
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Update Your Registration</h2>
                <Timeline />
              </div>
            )}

            {scenario === 'real-time' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <CivicScore score={score} />
                <PracticeBallot onVote={handleVote} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AssistantOrb />
    </div>
  );
}

export default App;
