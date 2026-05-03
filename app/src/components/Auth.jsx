import { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { motion } from 'framer-motion';

export default function Auth({ user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  if (user) {
    return (
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
        <button 
          onClick={() => signOut(auth)}
          className="liquid-glass"
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-primary)' }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Skip real auth if mocking keys
    if (import.meta.env.VITE_FIREBASE_API_KEY === undefined) {
      console.warn("Mocking Auth: Firebase API keys not found in .env");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div 
      className="liquid-glass"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        padding: '1.5rem',
        borderRadius: '12px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '250px'
      }}
    >
      <h3 style={{ margin: 0 }}>{isLogin ? 'Login' : 'Sign Up'}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'var(--glass-highlight)', color: 'var(--text-primary)' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'var(--glass-highlight)', color: 'var(--text-primary)' }}
        />
        <button 
          type="submit" 
          style={{ padding: '0.5rem', borderRadius: '6px', border: 'none', background: 'var(--accent-blue)', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>
      {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>{error}</p>}
      <button 
        onClick={() => setIsLogin(!isLogin)}
        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
      >
        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
      </button>
    </motion.div>
  );
}
