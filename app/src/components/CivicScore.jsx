import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const CivicScore = memo(function CivicScore({ score }) {
  const maxScore = 500;
  
  const percentage = useMemo(() => {
    return Math.min(100, (score / maxScore) * 100);
  }, [score]);

  return (
    <motion.section 
      className="liquid-glass"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem', willChange: 'transform, opacity' }}
      aria-label="Your Civic Score Dashboard"
    >
      <Trophy color="var(--accent-purple)" size={48} aria-hidden="true" />
      <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Your Civic Score</h2>
      
      <div 
        role="progressbar" 
        aria-valuenow={score} 
        aria-valuemin={0} 
        aria-valuemax={maxScore} 
        style={{ position: 'relative', width: '100%', maxWidth: '300px', height: '20px', background: 'var(--glass-bg)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}
      >
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))' }}
        />
      </div>
      
      <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }} aria-live="polite">
        {score} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>/ {maxScore}</span>
      </p>
      
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.9rem' }}>
        Engage with the modules to increase your civic readiness!
      </p>
    </motion.section>
  );
});

export default CivicScore;
