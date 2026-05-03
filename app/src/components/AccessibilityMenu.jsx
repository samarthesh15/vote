import React, { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Type, Contrast, Orbit } from 'lucide-react';

const AccessibilityMenu = memo(function AccessibilityMenu({ 
  isHighContrast, setIsHighContrast,
  isLargeText, setIsLargeText,
  isReducedMotion, setIsReducedMotion
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={menuRef} style={{ position: 'absolute', top: '2rem', right: '6rem', zIndex: 100 }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility Settings"
        aria-expanded={isOpen}
        style={{ 
          background: 'var(--glass-bg)', 
          border: '1px solid var(--glass-border)', 
          borderRadius: '50%', 
          width: '48px', 
          height: '48px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer', 
          color: 'var(--text-primary)' 
        }}
        className="liquid-glass"
      >
        <Settings size={24} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="liquid-glass"
            role="menu"
            onKeyDown={handleKeyDown}
            style={{
              position: 'absolute',
              top: '120%',
              right: 0,
              width: '240px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}
          >
            <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Accessibility</h3>
            
            <button 
              role="menuitemcheckbox"
              aria-checked={isHighContrast}
              onClick={() => setIsHighContrast(!isHighContrast)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', textAlign: 'left', color: 'var(--text-primary)', padding: '0.5rem', borderRadius: '8px', background: isHighContrast ? 'var(--glass-highlight)' : 'transparent', outlineOffset: '-2px' }}
            >
              <Contrast size={18} aria-hidden="true" />
              High Contrast
            </button>

            <button 
              role="menuitemcheckbox"
              aria-checked={isLargeText}
              onClick={() => setIsLargeText(!isLargeText)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', textAlign: 'left', color: 'var(--text-primary)', padding: '0.5rem', borderRadius: '8px', background: isLargeText ? 'var(--glass-highlight)' : 'transparent', outlineOffset: '-2px' }}
            >
              <Type size={18} aria-hidden="true" />
              Large Text
            </button>

            <button 
              role="menuitemcheckbox"
              aria-checked={isReducedMotion}
              onClick={() => setIsReducedMotion(!isReducedMotion)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', textAlign: 'left', color: 'var(--text-primary)', padding: '0.5rem', borderRadius: '8px', background: isReducedMotion ? 'var(--glass-highlight)' : 'transparent', outlineOffset: '-2px' }}
            >
              <Orbit size={18} aria-hidden="true" />
              Reduce Motion
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default AccessibilityMenu;
