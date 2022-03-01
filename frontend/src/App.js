import React from 'react';
import { MantineProvider, useMantineTheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useColorScheme } from '@mantine/hooks';
import Router from './Router';

function App() {
  const preferredColorScheme = useColorScheme();
  const theme = useMantineTheme();
  return (
    <MantineProvider
      theme={{
        primaryColor: 'indigo',
        colorScheme: preferredColorScheme,
        breakpoints: {
          xl: 1600
        }
      }}
      styles={{
        Paper: (theme) => ({
          root: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
          }
        })
      }}
      withNormalizeCSS
      withGlobalStyles
    >
      <NotificationsProvider position="top-right">
        <Router />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
