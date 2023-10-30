/**
 * User Event
 * https://testing-library.com/docs/user-event/intro/
 */
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

// import '@testing-library/jest-dom/extend-expect';

import Button from './Button';

// Tests
describe('Renders main page correctly', () => {
  /**
   * Resets all renders after each test
   */
  afterEach(() => {
    cleanup();
  });
  /**
   * Passes - shows title correctly
   */
  it('Should render the page correctly', () => {
    // Setup
    render(<Button />);
    const h1 = screen.queryByText('Nextjs_Vitest');

    // Post Expectations
    expect(h1).toBeInTheDocument();
  });

  /**
   * Passes - shows the button count correctly present
   */
  it('Should show the button count set to 0', () => {
    // Setup
    render(<Button />);
    const button = screen.queryByText('count is 0');

    // Expectations
    expect(button).toBeInTheDocument();
  });

  /**
   * Passes - clicks the button 3 times and shows the correct count
   */
  it('Should show the button count set to 3', async () => {
    // Setup
    const user = userEvent.setup();
    render(<Button />);
    const button = screen.queryByText('count is 0');

    // Pre Expectations
    expect(button).toBeInTheDocument();

    // Actions
    await user.click(button!);
    await user.click(button!);
    await user.click(button!);

    // Post Expectations
    expect(button?.innerHTML).toBe('count is 3');
  });
});
