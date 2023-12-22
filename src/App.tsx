import { ChakraProvider } from '@chakra-ui/react'
import { MasterMenuRoutes } from './app/routes/Routes';

export const App = () => {
  return (
    <ChakraProvider>
      <MasterMenuRoutes />
    </ChakraProvider>
  );
};
