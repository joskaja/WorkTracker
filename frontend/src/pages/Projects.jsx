import React from 'react'
import { Paper, Divider, Title, Group, Button } from '@mantine/core'
import AppShell from '../components/AppShell'
import { Outlet, Link } from 'react-router-dom'

function Projects() {
    return (
        <AppShell>
            <Paper shadow="sm" radius="md" padding="xl" style={{ position: 'relative', minHeight: '100%' }}>
                <Group mb="md">
                    <Title order={2}>Moje projekty</Title>
                    <Button component={Link} to="/projects/new" ml="auto">Přidat nový projekt</Button>
                </Group>
                <Divider my="lg" size="xs" />
                <Outlet />
            </Paper>
        </AppShell>
    )
}

export default Projects