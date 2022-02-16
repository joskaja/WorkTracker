import React from 'react'
import { Header as MantineHeader, Group, Burger, Title, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { MdPersonAddAlt, MdPersonOutline } from 'react-icons/md';
function Header() {
    return (
        <MantineHeader height={60} padding="xs">
            <Group>
                <Group>
                    <Burger />
                    <Title order={2}>WorkTracker</Title>
                </Group>
                <Group ml="auto">

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
                </Group>
            </Group>
        </MantineHeader>
    )
}

export default Header