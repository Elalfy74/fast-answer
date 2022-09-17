import { render, screen } from '@testing-library/react';

import { Test } from './Test';

test('Test My first', () => {
  render(<Test />);
  const text = screen.getByText('test');
  expect(text).toBeInTheDocument();
});
