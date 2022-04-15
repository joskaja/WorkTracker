import { Box, Group } from '@mantine/core'
import React from 'react'
import moment from 'moment';
import TimePicker from './TimePicker'
import DurationPicker from './DurationPicker';
import { countDuration } from '../../utils/time';


function TimeRangePicker({ startTime, endTime, setTime }) {


    const duration = countDuration(startTime, endTime);
   
    const setStartTime = (time) => {
        let start = moment(time, 'HH:mm');
        let end = moment(endTime, 'HH:mm');
        setTime('startTime', time);
        if (end.diff(start) <= 0) {
            const newEnd = start.clone().add(duration, 'milliseconds');
            setEndTime(newEnd.format('HH:mm'))
        }
    }

    const setEndTime = (time) => {
        let start = moment(startTime, 'HH:mm');
        let end = moment(time, 'HH:mm');
        if (end.diff(start) <= 0) time = '23:59';
        setTime('endTime', time);
    }

    return (
        <Group spacing="xs" position='center'>
            <TimePicker
                label="Začátek"
                time={startTime}
                onChange={(time) => setStartTime(time)}
            />
            <Box style={{ marginTop: '1.4rem' }}> - </Box>
            <TimePicker
                label="Konec"
                time={endTime}
                onChange={(time) => setEndTime(time)}
            />
            <DurationPicker
                duration={duration}
                onChange={(val) => {
                    const newEnd = moment(startTime, 'HH:mm');
                    setEndTime(newEnd.add(val, 'milliseconds').format('HH:mm'));
                }}
            />
        </Group>
    )
}

export default TimeRangePicker