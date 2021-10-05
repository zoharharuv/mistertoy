import { userService } from "../../services/user.service.js";
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js';

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            showSuccessMsg(`Welcome back, ${user.fullname}`)
            return user
        }
        catch (err) {
            showErrorMsg('Cannot login')
            console.log('Cannot login', err)
        }
    }
}

export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            showSuccessMsg(`Lets spend some, ${user.fullname}!`)
            return user
        }
        catch (err) {
            showErrorMsg('Cannot signup')
            console.log('Cannot signup', err)
        }

    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
            showSuccessMsg(`Goodbye my friend`)
        } catch (err) {
            showErrorMsg('Cannot logout')
            console.log('Cannot logout', err)
        }
    }
}

export function getCurrentUser() {
    return async (dispatch) => {
        try {
            const user = await userService.getLoggedinUser()
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            showErrorMsg('No user found')
            console.log('No user found', err)
        }
    }
}