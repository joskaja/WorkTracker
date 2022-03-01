import React from 'react'
import { Navbar as MantineNavbar, Box, Badge } from '@mantine/core'
import NavLink from './NavLink'
import { MdWorkOutline, MdOutlineHome, MdOutlineFolder, MdOutlineStore } from 'react-icons/md'
import NavUser from './NavUser'
function Navbar(props) {
    const {withBurger, menuOpened, toggleMenu, ...navbarProps} = props;
    return (
        <MantineNavbar {...navbarProps}>
            <MantineNavbar.Section grow>
                <NavLink to="/" icon={<MdOutlineHome />}>Domů</NavLink>
                <NavLink to="/reports" icon={<MdWorkOutline />}>Výkazy</NavLink>
                <NavLink to="/projects" icon={<MdOutlineFolder />}>Projekty</NavLink>
                <NavLink to="/clients" icon={<MdOutlineStore />}>Zákazníci</NavLink>
            </MantineNavbar.Section>
            <MantineNavbar.Section>
                <NavUser />
                <Box style={{ fontSize: '12px', margin: '10px 0', paddingLeft: '12px'}}>Studentský zápočtový projekt - Jan Joska</Box>
            </MantineNavbar.Section>
        </MantineNavbar>
    )
}

export default Navbar