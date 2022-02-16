import React from 'react';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Open Sans, sans serif',
        colorScheme: 'dark'
      }}
    >
      <h1>Work Tracker</h1>
    </MantineProvider>
  );
}

export default App;
