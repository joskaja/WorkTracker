import { Paper, Title } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import AppShell from '../components/AppShell'
import PageHeader from '../components/PageHeader'

function Account() {
    const { user } = useSelector(state => state.auth);
    return (
        <AppShell>
            <PageHeader>
                <Title order={2}>Uživatelský účet - {user.email}</Title>
            </PageHeader>
            <Paper
                style={{ position: 'relative', minHeight: '100%' }}
            >
                <Outlet />
            </Paper>
        </AppShell>
    )
}

export default Account