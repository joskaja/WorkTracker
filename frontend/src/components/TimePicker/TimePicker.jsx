import { Box } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import moment from 'moment'
import React, { useState } from 'react'
import { IoTimeOutline } from 'react-icons/io5'
import TimeKeeper from 'react-timekeeper'

function TimePicker({time, onChange, label}) {
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
                <Box style={{ position: 'absolute' }}>
                    <TimeKeeper
                        hour24Mode
                        switchToMinuteOnHourSelect
                        closeOnMinuteSelect
                        coarseMinutes
                        time={time}
                        onChange={time => onChange(time.formatted24)}
                        onDoneClick={() => setShowPicker(false)}
                    />
                </Box>
            }
        </Box>
    )
}

export default TimePicker