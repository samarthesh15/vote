import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export default function CivicScore({ score }) {
  // calculate percentage
  const maxScore = 500;
  const percentage = Math.min(100, (score / maxScore) * 100);

  return (
    <motion.div 
      className="liquid-glass"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}
    >
      <Trophy color="var(--accent-purple)" size={48} />
      <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Your Civic Score</h2>
      
      <div style={{ position: 'relative', width: '100%', maxWidth: '300px', height: '20px', background: 'var(--glass-bg)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))' }}
        />
      </div>
      
      <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
        {score} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>/ {maxScore}</span>
      </p>
      
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.9rem' }}>
        Engage with the modules to increase your civic readiness!
      </p>
    </motion.div>
  );
}
