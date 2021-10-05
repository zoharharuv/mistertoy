export function setLoader() {
    return (dispatch) => {
        dispatch({
            type: 'SET_LOADER',
        })
    }
}
