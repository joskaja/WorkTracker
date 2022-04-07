import { createStyles, Grid } from '@mantine/core';
import React from 'react'


const useStyles = createStyles((theme) => ({
    box: {
        textAlign: 'center',
        borderRight: '1px solid ' + (theme.colorScheme === 'dark' ? theme.colors.gray[1] : theme.colors.gray[4]),
        '&:last-of-type': {
            borderRight: 'none'
        }
    },
    title: {
        fontSize: '0.8rem',
        lineHeight: 1
    },
    value: {
        fontSize: '1.5rem',
        fontWeight: 700
    }
}));

function Totals({ data }) {
    const { classes } = useStyles();

    let totalHours = 0;
    let totalAmount = 0;
    let projects = new Set();
    let clients = new Set();
    data.forEach(session => {
        totalHours += session.duration;
        projects.add(session.project._id);
        clients.add(session.client._id);
        if (session.project.hourRate) {
            totalAmount += (session.duration * session.project.hourRate);
        }
    });

    return (
        <Grid>
            <Grid.Col sm={6} md={3} className={classes.box}>
                <div className={classes.title}>Počet hod.</div>
                <div className={classes.value}>{totalHours}&nbsp;hod.</div>
            </Grid.Col>
            <Grid.Col sm={6} md={3} className={classes.box}>
                <div className={classes.title}>Částka celkem</div>
                <div className={classes.value}>{totalAmount}&nbsp;Kč</div>
            </Grid.Col>
            <Grid.Col sm={6} md={3} className={classes.box}>
                <div className={classes.title}>Zákazníci</div>
                <div className={classes.value}>{clients.size}&nbsp;zák.</div>
            </Grid.Col>
            <Grid.Col sm={6} md={3} className={classes.box}>
                <div className={classes.title}>Projekty</div>
                <div className={classes.value}>{projects.size}&nbsp;proj.</div>
            </Grid.Col>
        </Grid>
    )
}

export default Totals