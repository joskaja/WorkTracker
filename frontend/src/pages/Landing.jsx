import React, { useEffect } from 'react'
import { Box, Grid, createStyles, Title, Container, Center, Button, Group } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowForward, IoPersonAddOutline, IoPersonOutline } from 'react-icons/io5'
import timePerson from '../resources/img/time_person.svg';
import { useSelector } from 'react-redux';

const useStyles = createStyles(theme => ({
    wrapper: {
        background: theme.fn.linearGradient(40, theme.colors.indigo[7], theme.colors.cyan[4]),
    },
    container: {
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
    },
    grid: {
        height: '100%'
    },
    center: {
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start !important',
        [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
            alignItems: 'center !important',
            textAlign: 'center'
        }
    },
    title: {
        fontSize: '5rem',
        color: '#FFF',
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            marginTop: '3rem',
            fontSize: '4rem'
        },
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            fontSize: '3rem'
        }
    },
    subtitle: {
        fontSize: '2rem',
        fontWeight: 500,
        color: '#FFF',
        marginBottom: '2rem',
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            fontSize: '1.6rem'
        },
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            fontSize: '1.4rem'
        }
    },
    button: {
        background: theme.fn.linearGradient(90, theme.colors.indigo[8], theme.colors.indigo[9]),
        boxShadow: theme.shadows.lg,
        transition: 'all .3s',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows.xl,
        }
    },
    image: {
        maxWidth: 600,
        width: '100%',
        height: 'auto',
        [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
            marginTop: '5rem',
            marginLeft: '5rem'
        }
    },
    imageWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
}));

function Landing() {
    const { user } = useSelector(state => state.auth);
    const { classes } = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user])

    return (
        <Box className={classes.wrapper}>
            <Container p="xl" size="xl" className={classes.container}>
                <Grid className={classes.grid}>
                    <Grid.Col sm={12} lg={6}>
                        <Center className={classes.center}>
                            <Title className={classes.title}>WorkTracker</Title>
                            <Title className={classes.subtitle}>Mějte vždy přehled o svém čase</Title>
                            <Group position="center">
                                <Button
                                    radius="xl"
                                    component={Link}
                                    to="/login"
                                    size="md"
                                    variant="gradient"
                                    className={classes.button}
                                    rightIcon={<IoPersonOutline />}
                                >
                                    Přihlásit se
                                </Button>
                                <Button
                                    radius="xl"
                                    component={Link}
                                    to="/register"
                                    size="md"
                                    variant="gradient"
                                    className={classes.button}
                                    rightIcon={<IoPersonAddOutline />}
                                >
                                    Registrovat se
                                </Button>
                            </Group>
                        </Center>
                    </Grid.Col>
                    <Grid.Col sm={12} lg={6} className={classes.imageWrap}>
                        <img className={classes.image} src={timePerson} alt="Person" />
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    )
}

export default Landing