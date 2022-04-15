import React, { useEffect, useState } from 'react';
import { Box, Grid, Skeleton, Center} from '@mantine/core';
import { apiService } from '../../services/apiService';
import { useNotifications } from '@mantine/notifications';
import Project from './Project';


function ProjectsList() {
    const notifications = useNotifications();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        apiService.get('/api/projects').then(data => {
            setProjects(data);
            setLoading(false);
        }).catch(e => {
            setLoading(false);
            notifications.showNotification({
                title: 'Chyba',
                message: e
            })
        });
    }, []);
    const deleteProject = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Opravdu chcete odstranit tento projekt?')) {
            setLoading(true);
            apiService.delete('/api/projects/' + id).then(() => {
                setProjects(state => state.filter(project => project._id !== id));
                setLoading(false);
            })
        }
    }
    return (
        <Box>
            <Grid>
                {projects.length > 0 && projects.map(project => (
                    <Grid.Col key={project._id} sm={12} md={6} lg={4} xl={3}><Project data={project} onDelete={deleteProject} /></Grid.Col>
                ))}
            </Grid>
            {(projects.length < 1 && !loading) && <Center style={{ width: '100%', minHeight: 200 }}>Zatím nemáte žádné projekty</Center>}
            {(projects.length < 1 && loading) && (
                <Grid align="stretch">
                    <Grid.Col sm={12} md={6} lg={4} xl={3}><Skeleton height={200} radius="sm" /></Grid.Col>
                    <Grid.Col sm={12} md={6} lg={4} xl={3}><Skeleton height={200} radius="sm" /></Grid.Col>
                    <Grid.Col sm={12} md={6} lg={4} xl={3}><Skeleton height={200} radius="sm" /></Grid.Col>
                </Grid>
            )}
        </Box>
    )
}

export default ProjectsList