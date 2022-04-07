import { Paper, Title } from '@mantine/core'
import React from 'react'
import { useParams } from 'react-router-dom';
import AppShell from '../components/AppShell'
import WorkSessionForm from '../components/WorkSessions/WorkSessionForm'

function Sessions() {
    const { sessionID } = useParams();
    return (
        <AppShell>
            <Title order={2}>Záznam</Title>
            <Paper
                shadow="sm"
                radius="md"
                p="xl"
                style={{ position: 'relative', minHeight: '100%' }}
            >
                <WorkSessionForm sessionId={sessionID}/>
            </Paper>
        </AppShell>
    )
}

export default Sessions