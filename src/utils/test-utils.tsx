// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

import QueryProvider from '../contexts/QueryProvider';
import { ChildrenProps } from '../data/types';

const AllTheProviders = ({ children }: ChildrenProps) => (
  <QueryProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';
export { customRender as render };
