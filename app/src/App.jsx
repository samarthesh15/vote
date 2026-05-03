import React, { useState, useEffect, useCallback } from 'react';
import Timeline from './components/Timeline';
import PracticeBallot from './components/PracticeBallot';
import CivicScore from './components/CivicScore';
import AssistantOrb from './components/AssistantOrb';
import AccessibilityMenu from './components/AccessibilityMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [scenario, setScenario] = useState(null);
  const [score, setScore] = useState(150);
  
  // Theming and Accessibility States
  const [isLightMode, setIsLightMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', isLightMode);
    root.classList.toggle('high-contrast', isHighContrast);
    root.classList.toggle('large-text', isLargeText);
    root.classList.toggle('reduce-motion', isReducedMotion);
  }, [isLightMode, isHighContrast, isLargeText, isReducedMotion]);

  const handleVote = useCallback(() => {
    setScore(prev => prev + 50);
  }, []);

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', position: 'relative' }}>
      
      <AccessibilityMenu 
        isHighContrast={isHighContrast} setIsHighContrast={setIsHighContrast}
        isLargeText={isLargeText} setIsLargeText={setIsLargeText}
        isReducedMotion={isReducedMotion} setIsReducedMotion={setIsReducedMotion}
      />

      <button 
        onClick={() => setIsLightMode(!isLightMode)}
        aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
        style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-primary)' }}
        className="liquid-glass"
      >
        {isLightMode ? <Moon size={24} aria-hidden="true" /> : <Sun size={24} aria-hidden="true" />}
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

      <main>
        <AnimatePresence mode="wait">
          {!scenario ? (
            <motion.nav 
              key="onboarding"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}
              aria-label="Election scenarios"
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
                  onKeyDown={(e) => handleKeyDown(e, () => setScenario(item.id))}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${item.title} scenario`}
                  className="liquid-glass"
                  style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', willChange: 'transform, opacity' }}
                >
                  <span style={{ fontSize: '3rem' }} aria-hidden="true">{item.icon}</span>
                  <h3 style={{ fontSize: '1.25rem' }}>{item.title}</h3>
                </motion.div>
              ))}
            </motion.nav>
          ) : (
            <motion.section 
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              aria-live="polite"
            >
              <button 
                onClick={() => setScenario(null)}
                aria-label="Back to scenarios"
                style={{ color: 'var(--text-secondary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: '8px' }}
              >
                ← Back to Scenarios
              </button>

              {scenario === 'first-time' && (
                <article>
                  <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Your Registration Path</h2>
                  <Timeline />
                </article>
              )}

              {scenario === 'relocator' && (
                <article>
                  <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Update Your Registration</h2>
                  <Timeline />
                </article>
              )}

              {scenario === 'real-time' && (
                <article style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <CivicScore score={score} />
                  <PracticeBallot onVote={handleVote} />
                </article>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <AssistantOrb />
    </div>
  );
}

export default App;
