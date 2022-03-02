import React from 'react'
import { Navbar as MantineNavbar, Box } from '@mantine/core'
import NavLink from './NavLink'
import { IoStorefrontOutline, IoHomeOutline, IoAlbumsOutline, IoBriefcaseOutline } from 'react-icons/io5'
import NavUser from './NavUser'
function Navbar(props) {
    const {withBurger, menuOpened, toggleMenu, ...navbarProps} = props;
    return (
        <MantineNavbar {...navbarProps}>
            <MantineNavbar.Section grow>
                <NavLink to="/" icon={<IoHomeOutline />}>Domů</NavLink>
                <NavLink to="/reports" icon={<IoBriefcaseOutline />}>Výkazy</NavLink>
                <NavLink to="/projects" icon={<IoAlbumsOutline />}>Projekty</NavLink>
                <NavLink to="/clients" icon={<IoStorefrontOutline />}>Zákazníci</NavLink>
            </MantineNavbar.Section>
            <MantineNavbar.Section>
                <NavUser />
                <Box style={{ fontSize: '12px', margin: '10px 0', paddingLeft: '12px'}}>Studentský zápočtový projekt - Jan Joska</Box>
            </MantineNavbar.Section>
        </MantineNavbar>
    )
}

export default Navbar