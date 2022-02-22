import { Paper, Title } from '@mantine/core'
import React, { useEffect } from 'react'
import AppShell from '../components/AppShell'
function Dashboard() {
    return (
        <AppShell>
           <Paper shadow="sm" radius="md" padding="xl">
               <Title order={2}>Dashboard</Title>
           </Paper>
        </AppShell>
    )
}

export default Dashboard