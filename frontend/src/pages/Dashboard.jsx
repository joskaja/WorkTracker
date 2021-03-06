import { Box, Paper, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import AppShell from '../components/AppShell'
import WorkSessionForm from '../components/WorkSessions/WorkSessionForm'
import DatePicker from '../components/DatePicker/DatePicker';
import WorkSessionList from '../components/WorkSessions/WorkSessionList';
import { useDispatch, useSelector } from 'react-redux';
import { loadWorkSessions, resetStatus, setDate } from '../features/WorkSessions/workSessionsSlice';
import { useNotifications } from '@mantine/notifications';
import { IoCloseCircleSharp } from 'react-icons/io5';
import moment from 'moment';
import PageHeader from '../components/PageHeader';
import WorkSessionTimeLine from '../components/WorkSessions/WorkSessionTimeLine';

function Dashboard() {
    const dispatch = useDispatch();
    const notifications = useNotifications();
    const { workSessions, message, status, date } = useSelector(state => state.workSessions);
    const [workSessionId, setWorkSessionId] = useState('');

    useEffect(() => {
        dispatch(loadWorkSessions());
        dispatch(resetStatus());
    }, [date]);

    useEffect(() => {
        if (status === 'load_error') {
            notifications.showNotification({
                title: 'Chyba při načítání!',
                message: message,
                color: 'red',
                icon: <IoCloseCircleSharp />
            })
        }
        dispatch(resetStatus());
    }, [message, status]);

    return (
        <AppShell>
            <PageHeader>
                <Title order={2}>Dashboard</Title>
                <Box>
                    <DatePicker
                        value={moment(date, 'DD.MM.YYYY').toDate()}
                        onChange={(value) => {
                            console.log(value);
                            dispatch(setDate(moment(value).format('DD.MM.YYYY')))
                        }}
                    />
                </Box>
            </PageHeader>
            <Paper mb="xl">
                <WorkSessionTimeLine step={4} data={workSessions} editWorkSession={setWorkSessionId} />
            </Paper>
            <Title mb="sm" mx="lg" order={4}>Nový záznam</Title>
            <Paper mb="xl">
                <WorkSessionForm sessionId={workSessionId} editWorkSession={setWorkSessionId} />
            </Paper>
            <Title mb="sm" mx="lg" order={4}>Přehled záznamů</Title>
            <Paper>
                <WorkSessionList data={workSessions} editWorkSession={setWorkSessionId} />
            </Paper>
        </AppShell>
    )
}

export default Dashboard