import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const AssistantOrb = memo(function AssistantOrb() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Civic Assistant. Have questions about the election?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "I'm a demo assistant, but in the real app, I'd give you the exact details you need!", sender: 'ai' }]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <motion.div 
        className="liquid-glass"
        role="button"
        tabIndex={0}
        aria-label={isOpen ? "Close Civic Assistant" : "Open Civic Assistant"}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent), var(--glass-bg)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.5)',
          willChange: 'transform'
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        {isOpen ? <X color="var(--text-primary)" size={28} aria-hidden="true" /> : <MessageCircle color="var(--text-primary)" size={28} aria-hidden="true" />}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, x: 50 }}
            transition={{ type: "spring", damping: 20 }}
            className="liquid-glass"
            style={{
              position: 'fixed',
              bottom: '6rem',
              right: '2rem',
              width: '320px',
              height: '400px',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
              gap: '1rem',
              overflow: 'hidden',
              willChange: 'transform, opacity'
            }}
            role="dialog"
            aria-label="Civic Assistant Chat"
          >
            <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', display: 'inline-block' }} aria-hidden="true"></span>
                Civic Assistant
              </h3>
            </div>
            
            <div 
              style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.5rem' }} 
              className="chat-messages"
              role="log"
              aria-live="polite"
            >
              {messages.map(msg => (
                <div key={msg.id} style={{ 
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'var(--glass-highlight)',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                  maxWidth: '85%',
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                aria-label="Type your message"
                style={{ 
                  flex: 1, 
                  background: 'var(--glass-bg)', 
                  border: '1px solid var(--glass-border)', 
                  borderRadius: '20px',
                  padding: '0.5rem 1rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <button 
                onClick={handleSend}
                aria-label="Send message"
                style={{ 
                  background: 'var(--accent-blue)', 
                  border: 'none', 
                  borderRadius: '50%', 
                  width: '36px', 
                  height: '36px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white'
                }}
              >
                <Send size={16} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default AssistantOrb;
