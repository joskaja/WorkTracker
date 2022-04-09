import React from 'react'
import { Center, Paper, createStyles, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IoPersonAddOutline, IoPersonOutline } from 'react-icons/io5'
import Logo from '../Navigation/Logo';

const useStyles = createStyles(theme => ({
    wrapper: {
        minHeight: '100vh',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        flexDirection: 'column'
    },
    paper: {
        maxWidth: theme.breakpoints.xs,
        width: '100%'
    },
    title: {
        fontSize: '3rem',
        marginBottom: '1rem'
    }
}));
function AccountFormWrap({ children }) {
    const { classes } = useStyles();

    return (
        <Center className={classes.wrapper}>
            <Logo className={classes.title} />
            <Paper
                radius="xs"
                className={classes.paper}
            >
                {children}
            </Paper>
            <Group mt="lg" position="center">
                <Button
                    component={Link}
                    to="/register"
                    variant="subtle"
                    leftIcon={<IoPersonAddOutline size={18} />}
                >
                    Registrovat se
                </Button>
                <Button
                    component={Link}
                    to="/login"
                    variant="subtle"
                    leftIcon={<IoPersonOutline size={18} />}
                >
                    Přihlásit se
                </Button>
            </Group>
        </Center>
    )
}

export default AccountFormWrap