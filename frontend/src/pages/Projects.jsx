import React from 'react'
import { Paper, Divider, Title, Group, Button } from '@mantine/core'
import AppShell from '../components/AppShell'
import { Outlet, Link } from 'react-router-dom'

function Projects() {
    return (
        <AppShell>
            <Group mb="sm" mx="lg">
                <Title order={2}>Moje projekty</Title>
                <Button
                    component={Link}
                    to="/projects/new"
                    ml="auto"
                    variant="subtle"
                >
                    Přidat nový projekt
                </Button>
            </Group>
            <Paper
                shadow="sm"
                radius="md"
                padding="xl"
                style={{ position: 'relative', minHeight: '100%' }}
            >
                <Outlet />
            </Paper>
        </AppShell>
    )
}

export default Projects