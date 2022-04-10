import moment from 'moment'

const createDurationString = (milliseconds) => {
    let duration = moment.duration(milliseconds);
    return `${duration.get('hours')} h ${duration.get('minutes')} min`;
}

const countDuration = (startTime, endTime) => {
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');
    return moment.duration(end.diff(start)).asMilliseconds()
}

export {
    createDurationString,
    countDuration
}