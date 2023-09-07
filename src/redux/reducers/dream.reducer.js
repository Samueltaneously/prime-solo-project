const dreamReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_DREAM':
            return action.payload;

        default:
            return state;
    }
};

export default dreamReducer;