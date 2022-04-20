import React from 'react'
import { UnstyledButton, Group, Avatar, Box, Text, Menu } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5'
import { logout, reset } from '../../features/Auth/authSlice';
import { Link } from 'react-router-dom';

function NavUser() {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
    }

    return (
        <Box px="md">
            {user && (
                <>
                    <Menu
                        control={
                            <UnstyledButton>
                                <Group>
                                    <Avatar size={40} color='indigo'>{user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}</Avatar>
                                    <div>
                                        <Text>{user.firstName} {user.lastName}</Text>
                                        <Text size="xs" color="gray">{user.email}</Text>
                                    </div>
                                </Group>
                            </UnstyledButton>
                        }>
                        <Menu.Label>Uživatel</Menu.Label>
                        <Menu.Item
                            component={Link} to="/account/password"
                            icon={<IoSettingsOutline size={14} />}
                        >
                            Změna hesla
                        </Menu.Item>
                        <Menu.Item
                            onClick={onLogout}
                            color="red"
                            icon={<IoLogOutOutline size={14} />}
                        >
                            Odhlásit se
                        </Menu.Item>
                    </Menu>
                </>
            )}
        </Box>
    )
}

export default NavUser