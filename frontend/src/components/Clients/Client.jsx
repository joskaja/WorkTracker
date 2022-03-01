import React from 'react'
import { Paper, Group, Button, Text, Title, Box, Grid, createStyles, ColorSwatch } from '@mantine/core'
import { Link } from 'react-router-dom'
import { MdAttachMoney, MdLocationCity, MdMailOutline, MdOutlinePhone } from 'react-icons/md'

const useStyles = createStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : ''
    },
    icon: {
        flexShrink: 0,
        fontSize: theme.fontSizes.lg,
        color: theme.colors.cyan
    },
    col: {
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

function Client({ data, onDelete }) {
    const { classes } = useStyles();

    return (
        <Paper shadow="sm" className={classes.paper} withBorder padding="lg">
            <Grid className={classes.body}>
                <Grid.Col sm={12}>
                    <Group>
                        <Text size="xl" weight={500} component={Link} to={`/clients/${data._id}`}>{data.name}</Text>
                        <ColorSwatch ml="auto" color={data.color} />
                    </Group>
                </Grid.Col>
                {data.defaultHourRate > 0 &&
                    <Grid.Col sm={12}>
                        <Group noWrap spacing="xs">
                            <MdAttachMoney className={classes.icon} />
                            <Text>{data.defaultHourRate}&nbsp;Kč</Text>
                        </Group>
                    </Grid.Col>
                }
                {data.email &&
                    <Grid.Col sm={12} md={6} className={classes.col}>
                        <Group noWrap spacing="xs">
                            <MdMailOutline className={classes.icon} />
                            <Text>{data.email}</Text>
                        </Group>
                    </Grid.Col>
                }
                {data.phone &&
                    <Grid.Col sm={12} md={6} className={classes.col}>
                        <Group noWrap spacing="xs">
                            <MdOutlinePhone className={classes.icon} />
                            <Text>{data.phone}</Text>
                        </Group>
                    </Grid.Col>
                }
                {(data.address && data.address.street) &&
                    <Grid.Col sm={12} className={classes.col}>
                        <Group noWrap spacing="xs">
                            <MdLocationCity className={classes.icon} />
                            <Text>{Object.values(data.address).join(', ')}</Text>
                        </Group>
                    </Grid.Col>
                }
            </Grid>
            <Group grow className={classes.footer}>
                <Button component={Link} to={`/clients/${data._id}`}>Upravit</Button>
                <Button color="red" onClick={() => onDelete(data._id)}>Odstranit</Button>
            </Group>
        </Paper>
    )
}

export default Client