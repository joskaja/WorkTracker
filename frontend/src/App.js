import React from 'react';
import { MantineProvider, useMantineTheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useColorScheme } from '@mantine/hooks';
import Router from './Router';

function App() {
  const preferredColorScheme = useColorScheme();
  return (
    <MantineProvider
      theme={{
        primaryColor: 'indigo',
        colorScheme: preferredColorScheme,
        breakpoints: {
          xl: 1600
        },
        dateFormat: 'DD.MM.YYYY'
      }}
      styles={{
        Paper: (theme) => ({
          root: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.sm
          }
        })
      }}
      withCSSVariables
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
