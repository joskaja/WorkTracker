import React, { useEffect, useState } from 'react'
import { Grid, Paper, Title, Drawer, Group, ActionIcon, Tooltip } from '@mantine/core'
import AppShell from '../components/AppShell'
import moment from 'moment';
import WorkSessionList from '../components/WorkSessions/WorkSessionList'
import { apiService } from '../services/apiService'
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


    const [filterOpened, setFilterOpened] = useState(false);

    useEffect(() => {
        console.log(filters)
        if (filters.dateRange[0] && filters.dateRange[1]) {
            setLoading(true);
            const queryParams = new URLSearchParams({
                startTime: filters.dateRange[0].getTime(),
                endTime: filters.dateRange[1].getTime(),
                ...filters
            })

            apiService.get('/api/work-sessions?' + queryParams.toString()).then(data => {
                data = data.map(session => {
                    const start = moment(session.startTime);
                    const end = moment(session.endTime);
                    session.time = moment.duration(end.diff(start)).asHours();
                    return session;
                });
                setWorkSessions(data);
                setLoading(false);
            });
        }
    }, [filters]);

    return (
        <AppShell>

            <PageHeader>
                <Title order={2}>V??kazy</Title>
                <Group style={{ textAlign: 'center' }}>
                    <DateRangePicker dateRange={filters.dateRange} setDateRange={(range) => setFilters({ ...filters, dateRange: range })} />
                    <Tooltip label="Pokro??il?? filtrov??n??" withArrow>
                        <ActionIcon
                            color="indigo"
                            onClick={() => setFilterOpened(true)}
                        >
                            <IoSettingsOutline />
                        </ActionIcon>
                    </Tooltip>
                </Group>
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
                    <Title mb="sm" mx="lg" order={4}>Pod??l z??kazn??k??</Title>
                    <Paper>
                        <ClientsShare data={loading ? [] : workSessions} loading={loading} />
                    </Paper>
                </Grid.Col>
                <Grid.Col sm={12} md={6}>
                    <Title mb="sm" mx="lg" order={4}>Pod??l projekt??</Title>
                    <Paper>
                        <ProjectsShare data={loading ? [] : workSessions} />
                    </Paper>
                </Grid.Col>
                <Grid.Col sm={12}>
                    <Title mb="sm" mx="lg" order={4}>P??ehled z??znam??</Title>
                    <Paper>
                        <WorkSessionList data={loading ? [] : workSessions} fullDates noActions />
                    </Paper>
                </Grid.Col>
            </Grid>
            <Drawer
                opened={filterOpened}
                onClose={() => setFilterOpened(false)}
                title="Filtrovat"
                padding="xl"
                size="lg"
                position="right"
                styles={{
                    drawer: {
                        borderRadius: 0
                    }
                }}
            >
                <FilterForm
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => {
                        setFilters(initialFilters);
                        setFilterOpened(false);
                    }}
                />
            </Drawer>
        </AppShell>
    )
}

export default Reports