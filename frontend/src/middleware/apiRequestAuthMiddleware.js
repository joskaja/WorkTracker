import { apiRequestService } from "../services/apiRequestService";
const createApiRequestAuthMiddleware = store => next => action => {
    console.log(action);
    if (['auth/login/fulfilled', 'auth/register/fulfilled', 'auth/logout/fulfilled'].includes(action.type)) {
        apiRequestService.commonOptions['Authorization'] = action.payload?.token ? `Bearer: ${action.payload.token}` : null;
        console.log(apiRequestService);
    }
    return next(action);
}
export default createApiRequestAuthMiddleware;