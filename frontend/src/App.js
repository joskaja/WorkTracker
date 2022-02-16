import React from 'react';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import Router from './Router';
import Header from './components/Header';

function App() {
  const preferredColorScheme = useColorScheme();
  return (
    <MantineProvider
      theme={{
        colorScheme: preferredColorScheme,
        primaryColor: 'indigo'
      }}
      withNormalizeCSS 
      withGlobalStyles
    >
      <Router>
        <Header />
      </Router>
    </MantineProvider>
  );
}

export default App;
