import React, { useEffect, useState } from 'react'
import { Box, Grid, Group, LoadingOverlay, Paper, Title } from '@mantine/core'
import AppShell from '../components/AppShell'
import { IoCalendar } from 'react-icons/io5'
import moment from 'moment';
import WorkSessionList from '../components/WorkSessions/WorkSessionList'
import { apiRequestService } from '../services/apiRequestService'
import ClientsShare from '../components/Reports/ClientsShare'
import ProjectsShare from '../components/Reports/ProjectsShare'
import ProductivityReport from '../components/Reports/ProductivityReport'
import Totals from '../components/Reports/Totals'
import DateRangePicker from '../components/DatePicker/DateRangePicker';
import { useNavigate } from 'react-router-dom';


function Reports() {
    const navigate = useNavigate();
    const [workSessions, setWorkSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState([
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate()
    ]);

    useEffect(() => {
        if (dateRange[0] && dateRange[1]) {
            setLoading(true);
            apiRequestService.get(`/api/work-sessions?startTime=${dateRange[0].getTime()}&endTime=${dateRange[1].getTime()}`).then(data => {
                data = data.map(session => {
                    const start = moment(session.startTime);
                    const end = moment(session.endTime);
                    session.time = moment.duration(end.diff(start)).asHours();
                    return session;
                });
                setWorkSessions(state => data);
                setLoading(false);
            });
        }
    }, [dateRange]);

    return (
        <AppShell>
            <LoadingOverlay visible={loading} />
            <Group mb="sm" mx="lg">
                <Title order={2}>Výkazy</Title>
                <Box ml="auto">
                    <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                </Box>
            </Group>
            <Grid gutter="xl">
                <Grid.Col sm={12}>
                    <Paper>
                        <Totals data={loading ? [] : workSessions} />
                    </Paper>
                </Grid.Col>
                <Grid.Col sm={12}>
                    <Title mb="sm" mx="lg" order={4}>Produktivita</Title>
                    <Paper>
                        <ProductivityReport range={dateRange} data={loading ? [] : workSessions} />
                    </Paper>
                </Grid.Col>
                <Grid.Col sm={12} md={6}>
                    <Title mb="sm" mx="lg" order={4}>Podíl zákazníků</Title>
                    <Paper>
                        <ClientsShare data={loading ? [] : workSessions} />
                    </Paper>
                </Grid.Col>
                <Grid.Col sm={12} md={6}>
                    <Title mb="sm" mx="lg" order={4}>Podíl projektů</Title>
                    <Paper>
                        <ProjectsShare data={loading ? [] : workSessions} />
                    </Paper>
                </Grid.Col>
                <Grid.Col sm={12}>
                    <Title mb="sm" mx="lg" order={4}>Přehled záznamů</Title>
                    <Paper>
                        <WorkSessionList data={loading ? [] : workSessions} fullDates noActions />
                    </Paper>
                </Grid.Col>
            </Grid>
        </AppShell>
    )
}

export default Reports