import { Box, createStyles, Tooltip } from '@mantine/core'
import React, { useMemo } from 'react'

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingBottom: 10
    },
    label: {
        position: 'absolute',
        display: 'inline-block',
        width: 25,
        textAlign: 'center',
        fontSize: 10,
    },
    timeline: {
        width: '100%',
        height: 30,
        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
    },
    item: {
        position: 'absolute',
        cursor: 'pointer',
        lineHeight: '23px',
        height: 30,
        padding: '2px 10px',
        backgroundColor: theme.colors.indigo[7],
        border: '1px solid',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.indigo[9] : theme.colors.indigo[3],
        color: '#FFF',
        fontSize: 14,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
}));

function WorkSessionTimeLine({ data, step, editWorkSession }) {
    const { classes } = useStyles();
    const times = useMemo(() => {
        const steps = [];
        for (let i = 0; i <= 24; i += step) {
            steps.push(i);
        }
        return steps;
    }, [step]);


    return (
        <Box className={classes.wrapper}>
            <Box className={classes.timeline}>
                {data.map((session) => {
                    const start = new Date(session.startTime);
                    const startHours = start.getHours() + (start.getMinutes() / 60);
                    return (
                        <Tooltip
                            key={session._id}
                            label={session.description}
                            className={classes.item}
                            style={{
                                width: `${session.duration / 24 * 100}%`,
                                left: `${startHours / 24 * 100}%`
                            }}
                            onClick={() => editWorkSession(session._id)}
                            withArrow
                        >
                            {session.description}
                        </Tooltip>
                    )
                }
                )}
            </Box>
            <Box>
                {times.map(time =>
                    <Box className={classes.label} style={{ left: `calc(${time / 24 * 100}% - (25px / 2))` }}>
                        {time}:00
                    </Box>
                )}
            </Box>
        </Box >
    )
}

export default WorkSessionTimeLine