import React from 'react'
import { Header as MantineHeader, Group, Burger, Title, Button, MediaQuery } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/Auth/authSlice';
import logo from '../../resources/img/logo.png';
import { IoLogOutOutline, IoPersonAddOutline, IoPersonOutline } from 'react-icons/io5';

function Header(props) {
    const { user } = useSelector(state => state.auth);
    const { withBurger, menuOpened, toggleMenu, ...headerProps } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login', { replace: true });
    }

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
                    <Title order={2} ml="sm"><Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>WorkTracker</Link></Title>
                </Group>
                <Group ml="auto">
                    {user && user.id ?
                        (
                            <>
                                <Button
                                    variant="subtle"
                                    onClick={onLogout}
                                    leftIcon={<IoLogOutOutline size={18} />}
                                >
                                    Odhlásit se
                                </Button>
                            </>
                        )
                        :
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