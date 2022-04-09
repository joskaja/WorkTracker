import React from 'react'
import { Navbar as MantineNavbar, Box, Divider } from '@mantine/core'
import NavLink from './NavLink'
import { IoStorefrontOutline, IoHomeOutline, IoAlbumsOutline, IoBriefcaseOutline } from 'react-icons/io5'
import NavUser from './NavUser'
import Logo from './Logo'
function Navbar({ withBurger, menuOpened, toggleMenu, ...navbarProps }) {
    return (
        <MantineNavbar {...navbarProps}>
            <MantineNavbar.Section pt="lg" pb="xl" pl="sm">
                <Logo />
            </MantineNavbar.Section>
            <MantineNavbar.Section grow>
                <NavLink to="/dashboard" icon={<IoHomeOutline />}>Domů</NavLink>
                <NavLink to="/reports" icon={<IoBriefcaseOutline />}>Výkazy</NavLink>
                <NavLink to="/projects" icon={<IoAlbumsOutline />}>Projekty</NavLink>
                <NavLink to="/clients" icon={<IoStorefrontOutline />}>Zákazníci</NavLink>
            </MantineNavbar.Section>
            <Divider mb="md" size="xs" />
            <MantineNavbar.Section>
                <NavUser />
                <Box style={{ fontSize: '12px', margin: '10px 0', paddingLeft: '12px' }}>Studentský zápočtový projekt - Jan Joska</Box>
            </MantineNavbar.Section>
        </MantineNavbar>
    )
}

export default Navbar