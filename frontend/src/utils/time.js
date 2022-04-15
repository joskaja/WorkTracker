import moment from 'moment'

const createDurationString = (milliseconds) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;


    return `${hours} h ${minutes} min`;
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