import React from 'react'
import { Box, Container, createStyles, Title } from '@mantine/core';

const useStyles = createStyles(theme => ({
    wrapper: {
        background: theme.fn.linearGradient(40, theme.colors.indigo[7], theme.colors.cyan[4]),
    },
    container: {
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '20rem',
        color: '#FFF'
    }
})
);

function NotFound() {
    const { classes } = useStyles();
    return (
        <Box className={classes.wrapper}>
            <Container p="xl" size="xl" className={classes.container}>
                <Title order={1} className={classes.title}>404</Title>
            </Container>
        </Box>
    )
}

export default NotFound