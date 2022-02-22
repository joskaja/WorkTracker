import React from 'react'
import { UnstyledButton, Group, Avatar, Box, Text, Divider } from '@mantine/core'
import { useSelector } from 'react-redux';

function NavUser() {
    const { user } = useSelector(state => state.auth);
    return (
        <Box sx={theme => ({ padding: theme.spacing.md })}>
            <Divider mb="md" size="xs"/>
            {user && (
                <UnstyledButton>
                    <Group>
                        <Avatar size={40} color='indigo'>{user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}</Avatar>
                        <div>
                            <Text>{user.firstName} {user.lastName}</Text>
                            <Text size="xs" color="gray">{user.email}</Text>
                        </div>
                    </Group>
                </UnstyledButton>
            )}
        </Box>
    )
}

export default NavUser