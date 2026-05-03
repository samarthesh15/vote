
import { render, screen, fireEvent } from '@testing-library/react';
import PracticeBallot from '../src/components/PracticeBallot';
import { describe, it, expect, vi } from 'vitest';

vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line no-unused-vars
    section: ({ children, whileHover, whileTap, ...rest }) => <section {...rest}>{children}</section>,
    // eslint-disable-next-line no-unused-vars
    div: ({ children, whileHover, whileTap, ...rest }) => <div {...rest}>{children}</div>,
    // eslint-disable-next-line no-unused-vars
    button: ({ children, whileHover, whileTap, ...rest }) => <button {...rest}>{children}</button>
  }
}));

describe('PracticeBallot', () => {
  it('calls onVote when a candidate is submitted', () => {
    const handleVote = vi.fn();
    render(<PracticeBallot onVote={handleVote} />);
    
    // Select a candidate
    const candidateBtn = screen.getByRole('radio', { name: /Alex Rivera/i });
    fireEvent.click(candidateBtn);
    
    // Submit
    const submitBtn = screen.getByRole('button', { name: /Confirm Practice Selection/i });
    fireEvent.click(submitBtn);
    
    expect(handleVote).toHaveBeenCalledTimes(1);
  });
});
