const initialState = {
    loader: false
}
export function systemReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_LOADER':
            newState = { ...state, loader: !state.loader }
            break;
        default:
    }

    window.userState = newState;
    return newState;
}
