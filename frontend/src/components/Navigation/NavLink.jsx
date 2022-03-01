
import React from 'react'
import { UnstyledButton, Text, Group, Box, createStyles, Badge } from '@mantine/core'
import { NavLink as RouterNavLink } from 'react-router-dom'

const useStyles = createStyles(theme => ({
    wrapper: {
    },
    button: {
        position: 'relative',
        display: 'block',
        padding: theme.spacing.sm,
        textDecoration: 'none !important',
        transition: 'background .3s',
        padding: '12px 12px 12px 24px',
        fontSize: theme.fontSizes.lg,
        '&:hover': {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
            color: theme.colors[theme.primaryColor],
        },
        '&.active': {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colors[theme.primaryColor],
        },
        '&:after': {
            content: '" "',
            position: 'absolute',
            height: 'calc(100% - 15px)',
            width: '5px',
            margin: '7.5px 0',
            top: 0,
            left: '-5px',
            borderRadius: '0px 8px 8px 0px',
            backgroundColor: theme.colors[theme.primaryColor],
            transition: 'all .1s ease-in 0s'
        },
        '&.active:after, &:hover:after': {
            left: 0
        }
    },
    text: {
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.gray[9]
    },
    badge: {
        marginLeft: 'auto'
    }
})
);

function NavLink({ children, badge, icon, to }) {
    const { classes } = useStyles();
    return (
        <Box className={classes.wrapper}>
            <UnstyledButton
                component={RouterNavLink}
                to={to}
                className={({isActive}) => classes.button + (isActive ? ' active' : '')}
                className={classes.button}
            >
                <Group>
                    {icon}
                    <Text className={classes.text}>{children}</Text>
                    {badge && <Badge className={classes.badge}>{badge}</Badge>}
                </Group>
            </UnstyledButton>
        </Box>
    )
}

export default NavLink