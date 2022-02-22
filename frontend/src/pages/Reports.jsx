import React from 'react'
import { Paper, Title } from '@mantine/core'
import AppShell from '../components/AppShell'

function Reports() {
    return (
        <AppShell>
            <Paper shadow="sm" radius="md" padding="xl">
                <Title order={2}>Výkazy</Title>
            </Paper>
        </AppShell>
    )
}

export default Reports