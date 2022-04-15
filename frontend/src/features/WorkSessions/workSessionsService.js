import { apiService } from '../../services/apiService';
import moment from 'moment';
const API_URL = '/api/work-sessions';

const loadWorkSessions = async (date) => {
    let mDate = moment(date, 'DD.MM.YYYY');
    let startTime = mDate.startOf('day').valueOf();
    let endTime = mDate.endOf('day').valueOf();
    return await apiService.get(API_URL + `?startTime=${startTime}&endTime=${endTime}`, date);
}
const createWorkSession = async (workSession) => {
    return await apiService.post('/api/work-sessions', workSession);
}
const updateWorkSession = async (workSession) => {
    return await apiService.put('/api/work-sessions/' + workSession.id, workSession);
}
const deleteWorkSession = async (workSessionId) => {
    return await apiService.delete('/api/work-sessions/' + workSessionId);
}
const workSessionsService = {
    loadWorkSessions,
    createWorkSession,
    updateWorkSession,
    deleteWorkSession
}

export default workSessionsService