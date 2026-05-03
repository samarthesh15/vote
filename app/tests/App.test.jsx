
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import { describe, it, expect, vi } from 'vitest';

// Mock Firebase and Framer Motion
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn((auth, cb) => {
    cb(null);
    return () => {};
  })
}));
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn()
}));
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn()
}));
vi.mock('../src/services/firebase', () => ({
  auth: {},
  db: {}
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    nav: 'nav',
    section: 'section',
    article: 'article',
    h1: 'h1',
    p: 'p',
    button: 'button'
  },
  AnimatePresence: ({ children }) => <>{children}</>
}));

describe('App', () => {
  it('renders the main title', () => {
    render(<App />);
    expect(screen.getByText(/VoteSure/i)).toBeInTheDocument();
  });

  it('can switch to real-time info scenario', () => {
    render(<App />);
    const btn = screen.getByRole('button', { name: /Select Upcoming Election Info scenario/i });
    fireEvent.click(btn);
    expect(screen.getByText(/Your Civic Score/i)).toBeInTheDocument();
  });
});
