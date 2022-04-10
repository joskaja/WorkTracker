import React, { useEffect, useState } from 'react'
import { Box, Grid, Paper, Title, Button, Modal } from '@mantine/core'
import AppShell from '../components/AppShell'
import moment from 'moment';
import WorkSessionList from '../components/WorkSessions/WorkSessionList'
import { apiRequestService } from '../services/apiRequestService'
import ClientsShare from '../components/Reports/ClientsShare'
import ProjectsShare from '../components/Reports/ProjectsShare'
import ProductivityReport from '../components/Reports/ProductivityReport'
import Totals from '../components/Reports/Totals'
import DateRangePicker from '../components/DatePicker/DateRangePicker';
import PageHeader from '../components/PageHeader';
import { IoSettingsOutline } from 'react-icons/io5'
import FilterForm from '../components/Reports/FilterForm'

const initialFilters = {
    client: '',
    project: '',
    dateRange: [
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate()
    ]
};

function Reports() {
    const [workSessions, setWorkSessions] = useState([]);
    const [loading, setLoading] = useState(false);


    const [filters, setFilters] = useState(initialFilters);

    console.log(filters)

    const [filterOpened, setFilterOpened] = useState(false);

    useEffect(() => {
        if (filters.dateRange[0] && filters.dateRange[1]) {
            setLoading(true);
            const queryParams = new URLSearchParams({
                startTime: filters.dateRange[0].getTime(),
                endTime: filters.dateRange[1].getTime(),
                ...filters
            })

            apiRequestService.get('/api/work-sessions?' + queryParams.toString()).then(data => {
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
    }, [filters]);

    return (
        <AppShell>

            <PageHeader>
                <Title order={2}>Výkazy</Title>
                <Box style={{ textAlign: 'center' }}>
                    <DateRangePicker dateRange={filters.dateRange} setDateRange={(range) => setFilters({ ...filters, dateRange: range })} />
                    <Button
                        variant="subtle"
                        leftIcon={<IoSettingsOutline />}
                        onClick={() => setFilterOpened(true)}
                    >
                        Pokročilé filtrování
                    </Button>
                </Box>
            </PageHeader>
            <Grid gutter="xl">
                <Grid.Col sm={12}>
                    <Paper>
                        <Totals data={loading ? [] : workSessions} />
                    </Paper>
                </Grid.Col>
                <Grid.Col sm={12}>
                    <Title mb="sm" mx="lg" order={4}>Produktivita</Title>
                    <Paper>
                        <ProductivityReport range={filters.dateRange} data={loading ? [] : workSessions} />
                    </Paper>
                </Grid.Col>
                <Grid.Col sm={12} md={6}>
                    <Title mb="sm" mx="lg" order={4}>Podíl zákazníků</Title>
                    <Paper>
                        <ClientsShare data={loading ? [] : workSessions} loading={loading} />
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
            <Modal
                opened={filterOpened}
                onClose={() => setFilterOpened(false)}
                title="Filtrovat"
                size="lg"
            >
                <FilterForm
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => {
                        setFilters(initialFilters);
                        setFilterOpened(false);
                    }}
                />
            </Modal>
        </AppShell>
    )
}

export default Reports