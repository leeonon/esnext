// https://codingwithmanny.medium.com/quick-vitest-setup-with-vitejs-react-typescript-bea9d3a01b07
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Tag from '../src/components/Tag';

describe('Renders main page correctly', () => {
  it('Should render the page correctly', () => {
    // Setup
    render(
      <Tag>
        <h1>Vite + React</h1>
      </Tag>,
    );
    const h1 = screen.queryByText('Vite + React');

    // Expectations
    expect(h1).not.toBeNull();
  });
});
