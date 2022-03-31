import { Group, Paper, Title } from '@mantine/core'
import React from 'react'
import AppShell from '../components/AppShell'
import WorkSessionForm from '../components/WorkSessions/WorkSessionForm'
import DatePicker from '../components/DatePicker/DatePicker';


function Dashboard() {

    return (
        <AppShell>
            <Group mb="sm" mx="lg">
                <Title order={2}>Dashboard</Title>
                <DatePicker/>
            </Group>
            <Paper shadow="sm" radius="md" padding="xl" mb="xl">
                <WorkSessionForm />
            </Paper>

            <Paper shadow="sm" radius="md" padding="xl">
                <Title order={4}>Přehled záznamů</Title>
            </Paper>
        </AppShell>
    )
}

export default Dashboard