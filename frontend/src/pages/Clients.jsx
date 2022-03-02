import React from 'react'
import { Button, Divider, Group, Paper, Title } from '@mantine/core'
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
            <Paper shadow="sm" radius="md" padding="xl" style={{ position: 'relative', minHeight: '100%' }}>
                <Outlet />
            </Paper>
        </AppShell>
    )
}

export default Clients