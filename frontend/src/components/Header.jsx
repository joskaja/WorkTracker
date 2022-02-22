import React from 'react'
import { Header as MantineHeader, Group, Burger, Title, Button, MediaQuery } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { MdPersonAddAlt, MdPersonOutline, MdOutlineLogout } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/Auth/authSlice';
import logo from '../resources/img/logo.png';

function Header(props) {
    const { user } = useSelector(state => state.auth);
    let { withBurger, menuOpened, toggleMenu } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login', { replace: true });
    }

    return (
        <MantineHeader {...props}>
            <Group>
                <Group>
                    {withBurger && (
                        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                            <Burger
                                opened={menuOpened}
                                onClick={() => toggleMenu(opened => !opened)}
                            />
                        </MediaQuery>
                    )}
                    <Link to="/"><img src={logo} alt="WorkTracker" height={40} /></Link>
                    <Title order={2}>WorkTracker</Title>
                </Group>
                <Group ml="auto">
                    {user && user.id ?
                        (
                            <>
                                <Button
                                    variant="subtle"
                                    onClick={onLogout}
                                    leftIcon={<MdOutlineLogout size={18} />}
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
                                    leftIcon={<MdPersonAddAlt size={18} />}
                                >
                                    Registrovat se
                                </Button>
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                                    leftIcon={<MdPersonOutline size={18} />}
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