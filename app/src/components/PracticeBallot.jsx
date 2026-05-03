import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const mockCandidates = [
  { id: 'c1', name: 'Alex Rivera', party: 'Independent', position: 'City Council' },
  { id: 'c2', name: 'Jordan Lee', party: 'Progressive', position: 'City Council' },
];

const PracticeBallot = memo(function PracticeBallot({ onVote }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = useCallback((id) => {
    setSelected(id);
    if (onVote && selected !== id) {
      onVote(); // Trigger Civic Score update only once per new selection for demo
    }
  }, [onVote, selected]);

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(id);
    }
  };

  return (
    <motion.div 
      className="liquid-glass"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem', willChange: 'transform, opacity' }}
    >
      <div>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Practice Ballot</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Familiarize yourself with your upcoming choices.</p>
      </div>

      <div 
        role="radiogroup" 
        aria-labelledby="city-council-heading"
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <h3 id="city-council-heading" style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>City Council</h3>
        
        {mockCandidates.map((candidate) => (
          <motion.div
            key={candidate.id}
            role="radio"
            aria-checked={selected === candidate.id}
            tabIndex={0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(candidate.id)}
            onKeyDown={(e) => handleKeyDown(e, candidate.id)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '1rem', 
              borderRadius: '12px',
              background: selected === candidate.id ? 'rgba(59, 130, 246, 0.2)' : 'var(--glass-bg)',
              border: `1px solid ${selected === candidate.id ? 'var(--accent-blue)' : 'var(--glass-border)'}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              willChange: 'transform'
            }}
          >
            <div>
              <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{candidate.name}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{candidate.party}</p>
            </div>
            {selected === candidate.id ? (
              <CheckCircle2 color="var(--accent-blue)" size={24} aria-hidden="true" />
            ) : (
              <Circle color="var(--text-secondary)" size={24} aria-hidden="true" />
            )}
          </motion.div>
        ))}
      </div>
      
      {selected && (
        <div aria-live="polite">
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="primary-button" 
            style={{ alignSelf: 'flex-start', marginTop: '1rem' }}
          >
            Confirm Practice Selection
          </motion.button>
        </div>
      )}
    </motion.div>
  );
});

export default PracticeBallot;
