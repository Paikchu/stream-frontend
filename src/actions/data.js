export const fetchDataRequest = () => ({
    type: 'FETCH_DATA_REQUEST',
});

export const fetchDataSuccess = data => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
});

export const fetchDataError = error => ({
    type: 'FETCH_DATA_ERROR',
    payload: error,
});
