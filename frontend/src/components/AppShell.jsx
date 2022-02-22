import React, { useState } from 'react'
import { AppShell as MantineAppShell } from '@mantine/core'
import Header from './Header'
import Navbar from './Navbar'

function AppShell({ children }) {
    const [menuOpened, setMenuOpened] = useState(false);
    return (
        <MantineAppShell
            navbarOffsetBreakpoint="md"
            fixed
            header={
                <Header
                    shadow="md"
                    height={60}
                    padding="xs"
                    menuOpened={menuOpened}
                    toggleMenu={setMenuOpened}
                    withBurger
                />}
            navbar={
                <Navbar
                    hiddenBreakPoint="md"
                    hidden={!menuOpened}
                    width={{ base: 250 }}
                    menuOpened={menuOpened}
                />}
        >
            {children}
        </MantineAppShell>
    )
}

export default AppShell