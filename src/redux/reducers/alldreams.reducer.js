const allDreamsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_DREAMS':
            return action.payload;

        default:
            return state;
    }
};

export default allDreamsReducer;