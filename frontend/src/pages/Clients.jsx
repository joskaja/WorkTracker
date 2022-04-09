import React from 'react'
import { Button, Paper, Title } from '@mantine/core'
import AppShell from '../components/AppShell'
import { Outlet, Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

function Clients() {

    return (
        <AppShell>
            <PageHeader>
                <Title order={2}>Moji zákazníci</Title>
                <Button
                    component={Link}
                    variant="subtle"
                    to="/clients/new"
                >Přidat nového zákazníka</Button>
            </PageHeader>
            <Paper style={{ position: 'relative', minHeight: '100%' }}>
                <Outlet />
            </Paper>
        </AppShell>
    )
}

export default Clients