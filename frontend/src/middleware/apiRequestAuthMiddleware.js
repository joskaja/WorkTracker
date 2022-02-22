import { apiRequestService } from "../services/apiRequestService";
const createApiRequestAuthMiddleware = store => next => action => {
    console.log(action);
    if (['auth/login/fulfilled', 'auth/register/fulfilled', 'auth/logout/fulfilled'].includes(action.type)) {
        const { user } = store.getState().auth;
        apiRequestService.commonOptions['Authorization'] = user?.token ? `Bearer: ${user.token}` : null;
        console.log(apiRequestService);
    }
    return next(action);
}
export default createApiRequestAuthMiddleware;