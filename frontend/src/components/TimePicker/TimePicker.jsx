import { Box, Button, createStyles } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import moment from 'moment'
import React, { useState } from 'react'
import { IoTimeOutline } from 'react-icons/io5'
import TimeKeeper from 'react-timekeeper'

const useStyles = createStyles(theme => ({
    timeKeeper: {
        '--clock-wrapper-bg': theme.colorScheme === 'dark' ? theme.colors.dark[5] : '',
        '--top-bg': theme.colorScheme === 'dark' ? theme.colors.dark[6] : '',
        '--done-bg-color': theme.colorScheme === 'dark' ? theme.colors.dark[6] : '',
        '--done-text-color': theme.colorScheme === 'dark' ? theme.colors.gray[0] : '',
        '--clock-bg': theme.colorScheme === 'dark' ? theme.colors.dark[6] : '',
        '--numbers-text-color': theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[3],
        '--top-selected-color': theme.colors[theme.primaryColor][5],
        '--hand-circle-inner': theme.colorScheme === 'dark' ? theme.colors[theme.primaryColor][7] : theme.colors[theme.primaryColor][1],
        '--hand-circle-outer': theme.colorScheme === 'dark' ? theme.colors[theme.primaryColor][7] : theme.colors[theme.primaryColor][1],
        '--hand-line-color': theme.colorScheme === 'dark' ? theme.colors[theme.primaryColor][7] : theme.colors[theme.primaryColor][1],
    }
}))

function TimePicker({ time, onChange, label }) {
    const { classes } = useStyles();
    const [showPicker, setShowPicker] = useState(false);

    return (
        <Box style={{ position: 'relative' }}>
            <TimeInput
                label={label}
                value={moment(time, 'HH:mm').toDate()}
                onChange={(time) => onChange(moment(time).format('HH:mm'))}
                icon={<IoTimeOutline />}
                onFocus={() => setShowPicker(true)}
                onBlur={() => setShowPicker(false)}
            />
            {showPicker &&
                <Box className={classes.timeKeeper} style={{ position: 'absolute', zIndex: 100 }}>
                    <TimeKeeper
                        hour24Mode
                        switchToMinuteOnHourSelect
                        closeOnMinuteSelect
                        coarseMinutes
                        time={time}
                        onChange={time => onChange(time.formatted24)}
                        doneButton={() => <Button radius={0} fullWidth>Hotovo</Button>}
                        onDoneClick={() => setShowPicker(false)}
                    />
                </Box>
            }
        </Box>
    )
}

export default TimePicker