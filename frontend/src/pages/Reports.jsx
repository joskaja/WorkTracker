import React, { useEffect, useState } from 'react'
import { Box, Grid, Center, Paper, Title, Button, Modal } from '@mantine/core'
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
import ClientSelect from '../components/Clients/ClientSelect';
import ProjectSelect from '../components/Projects/ProjectSelect';


function Reports() {
    const [workSessions, setWorkSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState([
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate()
    ]);

    const initialFilters = {
        client: '',
        project: ''
    };

    const [filters, setFilters] = useState(initialFilters);

    const [filterOpened, setFilterOpened] = useState(false);

    useEffect(() => {
        if (dateRange[0] && dateRange[1]) {
            setLoading(true);
            const queryParams = new URLSearchParams({
                startTime: dateRange[0].getTime(),
                endTime: dateRange[1].getTime(),
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
    }, [filters, dateRange]);

    return (
        <AppShell>

            <PageHeader>
                <Title order={2}>Výkazy</Title>
                <Box style={{ textAlign: 'center' }}>
                    <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
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
                        <ProductivityReport range={dateRange} data={loading ? [] : workSessions} />
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
                <Box>
                    <DateRangePicker
                        label="Rozmezí"
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                        variant="default"
                        noArrows
                    />
                    <ClientSelect
                        value={filters.client}
                        onChange={(val) => setFilters({ ...filters, client: val?._id || '' })}
                    />
                    <ProjectSelect
                        value={filters.project}
                        onChange={(val) => setFilters({ ...filters, project: val?._id || '' })}
                    />
                    <Center>
                        <Button
                            mt="md"
                            variant="subtle"
                            color="red"
                            onClick={() => {
                                setFilters(initialFilters);
                                setDateRange([
                                    moment().startOf('month').toDate(),
                                    moment().endOf('month').toDate()
                                ])
                                setFilterOpened(false);
                            }}
                        >
                            Resetovat filtrování
                        </Button>
                    </Center>
                </Box>
            </Modal>
        </AppShell>
    )
}

export default Reports