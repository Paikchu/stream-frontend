const initialState = {
    data: null,
    isLoading: false,
    error: null,
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_REQUEST':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };
        case 'FETCH_DATA_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default dataReducer;
