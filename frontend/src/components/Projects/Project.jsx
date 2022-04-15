import React from 'react'
import { Paper, Group, Button, Text, Grid, createStyles } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IoLogoUsd, IoStorefront, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';

const useStyles = createStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : '',
        boxShadow: 'none'
    },
    icon: {
        flexShrink: 0,
        fontSize: theme.fontSizes.md,
        color: theme.colors.indigo[9]
    },
    text: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    body: {
        marginBottom: theme.spacing.sm
    },
    footer: {
        marginTop: 'auto'
    }
})
);


function Project({ data, onDelete }) {
    const { classes } = useStyles();

    return (
        <Paper className={classes.paper} withBorder p="lg">
            <Grid className={classes.body}>
                <Grid.Col sm={12}>
                    <Text size="xl" weight={500} component={Link} to={`/projects/${data._id}`}>{data.name}</Text>
                </Grid.Col>
                {(data.client && data.client.name) &&
                    <Grid.Col sm={6}>
                        <Group noWrap spacing="xs">
                            <IoStorefront className={classes.icon} />
                            <Text className={classes.text}>{data.client.name}</Text>
                        </Group>
                    </Grid.Col>
                }
                {data.hourRate > 0 &&
                    <Grid.Col sm={6}>
                        <Group noWrap spacing="xs">
                            <IoLogoUsd className={classes.icon} />
                            <Text className={classes.text}>{data.hourRate}&nbsp;Kč</Text>
                        </Group>
                    </Grid.Col>
                }
            </Grid>
            <Group position="center" className={classes.footer}>
                <Button variant="subtle" leftIcon={<IoPencilOutline />} component={Link} to={`/projects/${data._id}`}>Upravit</Button>
                <Button variant="subtle" leftIcon={<IoTrashBinOutline />} color="red" onClick={() => onDelete(data._id)}>Odstranit</Button>
            </Group>
        </Paper >
    )
}

export default Project