import React from 'react'
import { Header as MantineHeader, Group, Burger, Button, MediaQuery } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoPersonAddOutline, IoPersonOutline } from 'react-icons/io5';
import Logo from './Logo';

function Header(props) {
    const { user } = useSelector(state => state.auth);
    const { withBurger, menuOpened, toggleMenu, ...headerProps } = props;

    return (
        <MantineHeader {...headerProps}>
            <Group>
                <Group>
                    {props.withBurger && (
                        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                            <Burger
                                opened={props.menuOpened}
                                onClick={() => props.toggleMenu(opened => !opened)}
                            />
                        </MediaQuery>
                    )}
                    <Logo />
                </Group>
                <Group ml="auto">
                    {(!user) &&
                        (
                            <>
                                <Button
                                    component={Link}
                                    to="/register"
                                    variant="outline" color="indigo"
                                    leftIcon={<IoPersonAddOutline size={18} />}
                                >
                                    Registrovat se
                                </Button>
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                                    leftIcon={<IoPersonOutline size={18} />}
                                >
                                    Přihlásit se
                                </Button>
                            </>
                        )
                    }
                </Group>
            </Group>
        </MantineHeader >
    )
}

export default Header