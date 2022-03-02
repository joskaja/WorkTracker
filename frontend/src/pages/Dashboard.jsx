import { Paper, Title } from '@mantine/core'
import React, { useEffect } from 'react'
import AppShell from '../components/AppShell'
import WorkSessionForm from '../components/WorkSessions/WorkSessionForm'
function Dashboard() {
    return (
        <AppShell>
            <Title order={2} mb="sm" ml="lg">Dashboard</Title>
            <Paper shadow="sm" radius="md" padding="xl">
                <WorkSessionForm />
            </Paper>
        </AppShell>
    )
}

export default Dashboard