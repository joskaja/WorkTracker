import React from 'react'
import { Button, Group, Paper, Title } from '@mantine/core'
import AppShell from '../components/AppShell'
import { Outlet, Link } from 'react-router-dom'

function Clients() {

    return (
        <AppShell>
            <Group mb="sm" mx="lg">
                <Title order={2}>Moji zákazníci</Title>
                <Button
                    component={Link}
                    variant="subtle"
                    to="/clients/new"
                    ml="auto"
                >Přidat nového zákazníka</Button>
            </Group>
            <Paper style={{ position: 'relative', minHeight: '100%' }}>
                <Outlet />
            </Paper>
        </AppShell>
    )
}

export default Clients