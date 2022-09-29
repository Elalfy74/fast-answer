import { QueryClient, QueryClientProvider } from 'react-query';

import { ChildrenProps } from '../data/global.types';

const QueryProvider = ({ children }: ChildrenProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
