import React, { useEffect, useState } from 'react';
import { Box, Center, createStyles, Grid, Skeleton } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import Client from './Client';
const useStyles = createStyles(theme => ({
    clientName: {
        display: 'flex',
        fontWeight: 'bold',
        fontSize: theme.fontSizes.md,
    },
    clientNameText: {
        marginLeft: 10
    }
})
);
function ClientsList() {
    const navigate = useNavigate();
    const { classes } = useStyles();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        apiService.get('/api/clients').then(data => {
            setClients(data);
            setLoading(false);
        });
    }, []);
    const deleteClient = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Opravdu chcete odstranit tohoto zákazníka?')) {
            setLoading(true);
            apiService.delete('/api/clients/' + id).then(() => {
                setClients(state => state.filter(client => client._id !== id));
                setLoading(false);
            })
        }
    }
    return (
        <Box>
            <Grid align="stretch">
                {clients.length > 0 && clients.map(client => (
                    <Grid.Col key={client._id} sm={12} md={6} lg={4} xl={3}><Client data={client} onDelete={deleteClient} /></Grid.Col>
                ))}

            </Grid>
            {(clients.length < 1 && loading) && (
                <Grid align="stretch">
                    <Grid.Col sm={12} md={6} lg={4} xl={3}><Skeleton height={200} radius="sm" /></Grid.Col>
                    <Grid.Col sm={12} md={6} lg={4} xl={3}><Skeleton height={200} radius="sm" /></Grid.Col>
                    <Grid.Col sm={12} md={6} lg={4} xl={3}><Skeleton height={200} radius="sm" /></Grid.Col>
                </Grid>
            )}
            {(clients.length < 1 && !loading) && <Center style={{ width: '100%', minHeight: 200 }}>Zatím nemáte žádné zákazníky</Center>}


        </Box>
    )
}

export default ClientsList