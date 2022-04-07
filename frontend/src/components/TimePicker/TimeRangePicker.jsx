import { Box, Group } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import TimePicker from './TimePicker'
import DurationPicker from './DurationPicker';

const countDuration = (startTime, endTime) => {
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');
    return moment.duration(end.diff(start)).asMilliseconds()
}

function TimeRangePicker({ startTime, endTime, setTime }) {

    const [duration, setDuration] = useState(countDuration(startTime, endTime));

    useEffect(() => {
        setDuration(countDuration(startTime, endTime));
    }, [startTime, endTime]);


    const setStartTime = (time) => {
        let start = moment(time, 'HH:mm');
        let end = moment(endTime, 'HH:mm');
        if (end.diff(start) < 0) time = end.subtract(1, 'hours').format('HH:mm');
        setTime('startTime', time);
    }

    const setEndTime = (time) => {
        let start = moment(startTime, 'HH:mm');
        let end = moment(time, 'HH:mm');
        if (end.diff(start) < 0) time = start.add(1, 'hours').format('HH:mm');
        if (end.isAfter(start.endOf('day').subtract(1, 'minute'))) time = '23:59';
        setTime('endTime', time);
    }

    return (
        <Group spacing="xs">
            <TimePicker
                label="Začátek"
                time={startTime}
                onChange={(time) => setStartTime(time)
                }
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