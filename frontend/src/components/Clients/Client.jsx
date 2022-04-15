import React from 'react'
import { Paper, Group, Button, Text, Grid, createStyles, ColorSwatch } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IoLogoUsd, IoIosMail, IoIosCall, IoIosBusiness } from 'react-icons/io'
import { IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5'

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
        color: theme.colors.indigo
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

function Client({ data, onDelete }) {
    const { classes } = useStyles();

    return (
        <Paper className={classes.paper} withBorder p="lg">
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
                            <IoLogoUsd className={classes.icon} />
                            <Text className={classes.text}>{data.defaultHourRate}&nbsp;Kč</Text>
                        </Group>
                    </Grid.Col>
                }
                {data.email &&
                    <Grid.Col sm={12} md={6}>
                        <Group noWrap spacing="xs">
                            <IoIosMail className={classes.icon} />
                            <Text className={classes.text}>{data.email}</Text>
                        </Group>
                    </Grid.Col>
                }
                {data.phone &&
                    <Grid.Col sm={12} md={6}>
                        <Group noWrap spacing="xs">
                            <IoIosCall className={classes.icon} />
                            <Text className={classes.text}>{data.phone}</Text>
                        </Group>
                    </Grid.Col>
                }
                {(data.address && data.address.street) &&
                    <Grid.Col sm={12}>
                        <Group noWrap spacing="xs">
                            <IoIosBusiness className={classes.icon} />
                            <Text className={classes.text}>{Object.values(data.address).join(', ')}</Text>
                        </Group>
                    </Grid.Col>
                }
            </Grid>
            <Group position="center" className={classes.footer}>
                <Button variant="subtle" leftIcon={<IoPencilOutline />} component={Link} to={`/clients/${data._id}`}>Detail</Button>
                <Button variant="subtle" leftIcon={<IoTrashBinOutline />} color="red" onClick={() => onDelete(data._id)}>Odstranit</Button>
            </Group>
        </Paper>
    )
}

export default Client