import React from 'react'
import { Paper, Title, Button } from '@mantine/core'
import AppShell from '../components/AppShell'
import { Outlet, Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

function Projects() {
    return (
        <AppShell>
            <PageHeader>
                <Title order={2}>Moje projekty</Title>
                <Button
                    component={Link}
                    to="/projects/new"
                    variant="subtle"
                >
                    Přidat nový projekt
                </Button>
            </PageHeader>
            <Paper
                style={{ position: 'relative', minHeight: '100%' }}
            >
                <Outlet />
            </Paper>
        </AppShell>
    )
}

export default Projects