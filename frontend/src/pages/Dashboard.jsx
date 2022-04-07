import { Box, Group, Paper, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import AppShell from '../components/AppShell'
import WorkSessionForm from '../components/WorkSessions/WorkSessionForm'
import DatePicker from '../components/DatePicker/DatePicker';
import WorkSessionList from '../components/WorkSessions/WorkSessionList';
import { useDispatch, useSelector } from 'react-redux';
import { loadWorkSessions } from '../features/WorkSessions/workSessionsSlice';
import { useNotifications } from '@mantine/notifications';
import { IoCloseCircleSharp } from 'react-icons/io5';


function Dashboard() {
    const dispatch = useDispatch();
    const notifications = useNotifications();
    const { workSessions, message, status } = useSelector(state => state.workSessions);
    const [workSessionId, setWorkSessionId] = useState('');

    useEffect(() => {
        dispatch(loadWorkSessions());
    }, []);

    useEffect(() => {
        if (status === 'load_error') {
            notifications.showNotification({
                title: 'Chyba při načítání!',
                message: message,
                color: 'red',
                icon: <IoCloseCircleSharp />
            })
        }
    }, [message, status]);

    return (
        <AppShell>
            <Group mb="sm" mx="lg">
                <Title order={2}>Dashboard</Title>
                <Box ml="auto">
                    <DatePicker />
                </Box>
            </Group>
            <Title mb="sm" mx="lg" order={4}>Nový záznam</Title>
            <Paper mb="xl">
                <WorkSessionForm sessionId={workSessionId} />
            </Paper>
            <Title mb="sm" mx="lg" order={4}>Přehled záznamů</Title>
            <Paper>
                <WorkSessionList data={workSessions} editWorkSession={setWorkSessionId} />
            </Paper>
        </AppShell>
    )
}

export default Dashboard