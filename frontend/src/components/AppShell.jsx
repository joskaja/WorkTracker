import React, { useState } from 'react'
import { AppShell as MantineAppShell, Container, useMantineTheme } from '@mantine/core'
import Header from './Navigation/Header'
import Navbar from './Navigation/Navbar'
import { useViewportSize } from '@mantine/hooks';

function AppShell({ children }) {
    const [menuOpened, setMenuOpened] = useState(false);
    const { width } = useViewportSize();
    const theme = useMantineTheme();
    return (
        <MantineAppShell
            navbarOffsetBreakpoint="md"
            fixed
            header={
                (width < theme.breakpoints.md &&
                    <Header
                        shadow="lg"
                        height={60}
                        p="xs"
                        toggleMenu={setMenuOpened}
                        withBurger
                    />)
            }
            navbar={
                <Navbar
                    hidden={!menuOpened}
                    width={{ sm: 300, lg: 250 }}
                />
            }
            sx={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <Container size="xl" style={{ minHeight: '100%' }} px={0}>
                {children}
            </Container>
        </MantineAppShell>
    )
}

export default AppShell