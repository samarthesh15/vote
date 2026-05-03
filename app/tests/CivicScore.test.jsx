
import { render, screen } from '@testing-library/react';
import CivicScore from '../src/components/CivicScore';
import { describe, it, expect, vi } from 'vitest';

vi.mock('framer-motion', () => ({
  motion: {
    section: 'section',
    div: 'div'
  }
}));

describe('CivicScore', () => {
  it('renders the correct score out of max score', () => {
    render(<CivicScore score={300} />);
    expect(screen.getByText(/300/i)).toBeInTheDocument();
    expect(screen.getByText(/\/ 500/i)).toBeInTheDocument();
  });
});
